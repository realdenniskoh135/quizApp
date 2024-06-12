import { HttpError } from 'wasp/server'

export const getQuiz = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { quizId } = args;

  const quiz = await context.entities.Quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          options: true
        }
      }
    }
  });

  if (!quiz) { throw new HttpError(404, `Quiz with id ${quizId} not found`) }

  if (quiz.userId !== context.user.id) { throw new HttpError(400, 'Quiz does not belong to the user') }

  return quiz;
}

export const getQuizzes = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Quiz.findMany({
    where: { userId: context.user.id },
    include: { questions: { include: { options: true } } }
  });
}

export const getUserAnswers = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const answers = await context.entities.Answer.findMany({
    where: { userId: context.user.id },
    include: {
      question: true,
      option: true
    }
  });

  return answers;
};
