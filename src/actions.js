import { sendEmail } from "./sendEmail";

export const submitQuiz = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const quiz = await context.entities.Quiz.findUnique({
    where: { id: args.quizId },
    include: { questions: { include: { options: true } } }
  });

  if (quiz.userId !== context.user.id) { throw new HttpError(403) };

  let emailContent = `<h1>Quiz Results for ${quiz.title}</h1><ul>`;
  quiz.questions.forEach(question => {
    emailContent += `<li>${question.questionText}: `;
    question.options.forEach(option => {
      if (args.selectedOptions[question.id].includes(option.id)) {
        emailContent += `<strong>${option.optionText}</strong>`;
      }
    });
    emailContent += `</li>`;
  });
  emailContent += `</ul>`;

  await sendEmail(context.user.email, "Your Quiz Submission", "Here are your quiz results:", emailContent);

  return quiz;
};
