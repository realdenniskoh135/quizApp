import { HttpError } from 'wasp/server'

export const createQuiz = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newQuiz = await context.entities.Quiz.create({
    data: {
      user: { connect: { id: context.user.id } },
      questions: {
        create: args.questions.map((question, index) => ({
          questionText: question,
          options: {
            create: args.options.slice(index * 5, (index + 1) * 5).map((option, optionIndex) => ({
              optionText: option,
              isCorrect: optionIndex === 1
            }))
          }
        }))
      }
    }
  });

  return newQuiz;
}

export const submitQuiz = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const quiz = await context.entities.Quiz.findUnique({
    where: { id: args.quizId }
  });
  if (quiz.userId !== context.user.id) { throw new HttpError(403) };
  for (const question of quiz.questions) {
    for (const selectedOptionId of args.selectedOptions[question.id]) {
      const option = await context.entities.Option.findUnique({
        where: { id: selectedOptionId }
      });
      if (!option) { throw new HttpError(400, `Invalid option selected for question ${question.id}`) };
      if (option.questionId !== question.id) { throw new HttpError(400, `Option does not belong to question ${question.id}`) };
      await context.entities.Option.update({
        where: { id: selectedOptionId },
        data: { isCorrect: true }
      });
    }
  }
  return context.entities.Quiz.findUnique({
    where: { id: args.quizId },
    include: { questions: { include: { options: true } } }
  });
}