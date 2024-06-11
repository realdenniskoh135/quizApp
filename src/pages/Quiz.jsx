import React, { useState } from 'react';

const quizzes = [
  {
    id: 1,
    question: 'What is your current level of experience with programming?',
    options: [
      { id: 'A', text: 'No experience' },
      { id: 'B', text: 'Beginner' },
      { id: 'C', text: 'Intermediate' },
      { id: 'D', text: 'Advanced' }
    ]
  },
  {
    id: 2,
    question: 'Which programming languages are you familiar with? (Select all that apply)',
    options: [
      { id: 'A', text: 'Python' },
      { id: 'B', text: 'JavaScript' },
      { id: 'C', text: 'Java' },
      { id: 'D', text: 'C++' }
    ]
  },
  {
    id: 3,
    question: 'What motivates you to learn programming?',
    options: [
      { id: 'A', text: 'Career advancement' },
      { id: 'B', text: 'Academic requirements' },
      { id: 'C', text: 'Personal interest' },
      { id: 'D', text: 'Other' }
    ]
  },
  {
    id: 4,
    question: 'How do you prefer to learn new concepts?',
    options: [
      { id: 'A', text: 'Reading textbooks or articles' },
      { id: 'B', text: 'Watching videos' },
      { id: 'C', text: 'Hands-on practice' },
      { id: 'D', text: 'Interactive tutorials' }
    ]
  },
  {
    id: 5,
    question: 'How much time do you dedicate to learning programming each week?',
    options: [
      { id: 'A', text: 'Less than 1 hour' },
      { id: 'B', text: '1 to 3 hours' },
      { id: 'C', text: '3 to 5 hours' },
      { id: 'D', text: 'More than 5 hours' }
    ]
  }
];

const QuizPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const currentSelections = prevSelectedOptions[questionId] || [];
      const isAlreadySelected = currentSelections.includes(optionId);
  
      if (isAlreadySelected) {
        // If the option is already selected, clicking it again will remove it from the selections
        return {
          ...prevSelectedOptions,
          [questionId]: currentSelections.filter(id => id !== optionId)
        };
      } else {
        // Add the option to the selections only if there are less than 2 options already selected
        if (currentSelections.length < 2) {
          return {
            ...prevSelectedOptions,
            [questionId]: [...currentSelections, optionId]
          };
        }
      }
      // If already 2 options are selected and the current one isn't one of them, just return the previous state
      return prevSelectedOptions;
    });
  };
  

  const handleSubmitQuiz = () => {
    console.log('Submitting quiz with selections:', selectedOptions);
    setSubmitted(true);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Quiz</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className='mb-6'>
          <h2 className='text-xl mb-2'>{quiz.question}</h2>
          <div className='grid grid-cols-1 gap-4'>
            {quiz.options.map((option) => {
              const isSelected = selectedOptions[quiz.id]?.includes(option.id);
              console.log(`Is option ${option.id} selected?`, isSelected);
              return (
                <div
                  key={option.id}
                  className={`bg-gray-100 p-4 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-200' : ''}`}
                  onClick={() => handleOptionSelect(quiz.id, option.id)}
                >
                  {option.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={handleSubmitQuiz}
      >
        Submit
      </button>
      {submitted && (
        <div className='mt-4'>
          <div className='text-green-500'>Quiz submitted successfully!</div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;