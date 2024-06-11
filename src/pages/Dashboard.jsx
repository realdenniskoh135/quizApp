import React from 'react';
import { Link } from 'react-router-dom';

const quizzes = [
  {
    id: 1,
    question: '1. What is your current level of experience with programming?',
    options: [
      { id: 'A', text: 'No experience' },
      { id: 'B', text: 'Beginner' },
      { id: 'C', text: 'Intermediate' },
      { id: 'D', text: 'Advanced' }
    ]
  },
  {
    id: 2,
    question: '2. Which programming languages are you most familiar with? (Select top two languages)',
    options: [
      { id: 'A', text: 'Python' },
      { id: 'B', text: 'JavaScript' },
      { id: 'C', text: 'Java' },
      { id: 'D', text: 'C++' }
    ]
  },
  {
    id: 3,
    question: '3. What motivates you to learn programming?',
    options: [
      { id: 'A', text: 'Career advancement' },
      { id: 'B', text: 'Academic requirements' },
      { id: 'C', text: 'Personal interest' },
      { id: 'D', text: 'Other' }
    ]
  },
  {
    id: 4,
    question: '4. How do you prefer to learn new concepts?',
    options: [
      { id: 'A', text: 'Reading textbooks or articles' },
      { id: 'B', text: 'Watching videos' },
      { id: 'C', text: 'Hands-on practice' },
      { id: 'D', text: 'Interactive tutorials' }
    ]
  },
  {
    id: 5,
    question: '5. How much time do you dedicate to learning programming each week?',
    options: [
      { id: 'A', text: 'Less than 1 hour' },
      { id: 'B', text: '1 to 3 hours' },
      { id: 'C', text: '3 to 5 hours' },
      { id: 'D', text: 'More than 5 hours' }
    ]
  }
];

const singleQuiz = quizzes.find(quiz => quiz.id === 1);

const DashboardPage = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Quizzes</h1>
      {singleQuiz && (
        <Link to={`/quiz/${singleQuiz.id}`}>
          <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div className='mb-2'>Quiz</div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default DashboardPage;