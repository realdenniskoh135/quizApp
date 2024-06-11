import React, { useState, useEffect } from 'react';

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
    question: '2. Which programming languages are you familiar with? (Select top two languages)',
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

const determineSixthQuestionOptions = (selectedOptions) => {
  const firstQuestionSelection = selectedOptions[1]?.[0]; // Assuming single selection for the first question
  if (firstQuestionSelection) {
    if (firstQuestionSelection === 'A' || firstQuestionSelection === 'B') {
      return [
        { id: 'A', text: 'Improving data structures and algorithms understanding' },
        { id: 'B', text: 'Hands-on experience developing web applications' },
        { id: 'C', text: 'Mobile development careers and pathways' },
        { id: 'D', text: 'Learning about web development' }
      ];
    } else {
      return [
        { id: 'A', text: 'Quantum computing concepts and applications' },
        { id: 'B', text: 'Advanced neural network architectures' },
        { id: 'C', text: 'Parallel computing and GPUs' },
        { id: 'D', text: 'Development and deployment of IoT devices' }
      ];
    }
  }
  return [];
};

const determineSeventhQuestionOptions = (selectedOptions) => {
  const fourthQuestionSelection = selectedOptions[4]?.[0]; // Assuming single selection for the fourth question
  if (fourthQuestionSelection) {
    if (fourthQuestionSelection === 'A') {
      return [
        { id: 'A', text: 'Recommended textbooks on programming' },
        { id: 'B', text: 'Scientific articles about computer science' },
        { id: 'C', text: 'Books on software engineering principles' },
        { id: 'D', text: 'Journals on latest tech trends' }
      ];
    } else if (fourthQuestionSelection === 'B') {
      return [
        { id: 'A', text: 'Popular programming video channels' },
        { id: 'B', text: 'Online courses with video content' },
        { id: 'C', text: 'Documentaries on tech innovations' },
        { id: 'D', text: 'Tech conferences and talks' }
      ];
    } else if (fourthQuestionSelection === 'C') {
      return [
        { id: 'A', text: 'Online coding challenges' },
        { id: 'B', text: 'Hackathons and coding competitions' },
        { id: 'C', text: 'Project-based learning platforms' },
        { id: 'D', text: 'Collaborative coding environments' }
      ];
    } else if (fourthQuestionSelection === 'D') {
      return [
        { id: 'A', text: 'Interactive coding tutorials' },
        { id: 'B', text: 'Online simulation and labs' },
        { id: 'C', text: 'Interactive problem-solving platforms' },
        { id: 'D', text: 'Virtual learning environments' }
      ];
    }
  }
  return [];
};

const QuizPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const [seventhQuestionOptions, setSeventhQuestionOptions] = useState([]);

  useEffect(() => {
    setDynamicOptions(determineSixthQuestionOptions(selectedOptions));
  }, [selectedOptions]);

  useEffect(() => {
    setSeventhQuestionOptions(determineSeventhQuestionOptions(selectedOptions));
  }, [selectedOptions]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const currentSelections = prevSelectedOptions[questionId] || [];
      const isAlreadySelected = currentSelections.includes(optionId);
  
      if (isAlreadySelected) {
        return {
          ...prevSelectedOptions,
          [questionId]: currentSelections.filter(id => id !== optionId)
        };
      } else {
        if (currentSelections.length < 2) {
          return {
            ...prevSelectedOptions,
            [questionId]: [...currentSelections, optionId]
          };
        }
      }
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
      {dynamicOptions.length > 0 && (
        <div key={6} className='mb-6'>
          <h2 className='text-xl mb-2'>6. Based on your experience, which areas are you most interested in (up to two)?</h2>
          <div className='grid grid-cols-1 gap-4'>
            {dynamicOptions.map((option) => {
              const isSelected = selectedOptions[6]?.includes(option.id);
              return (
                <div
                  key={option.id}
                  className={`bg-gray-100 p-4 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-200' : ''}`}
                  onClick={() => handleOptionSelect(6, option.id)}
                >
                  {option.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {seventhQuestionOptions.length > 0 && (
        <div key={7} className='mb-6'>
          <h2 className='text-xl mb-2'>7. Based on your preferred learning method, what would you like to explore next?</h2>
          <div className='grid grid-cols-1 gap-4'>
            {seventhQuestionOptions.map((option) => {
              const isSelected = selectedOptions[7]?.includes(option.id);
              return (
                <div
                  key={option.id}
                  className={`bg-gray-100 p-4 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-200' : ''}`}
                  onClick={() => handleOptionSelect(7, option.id)}
                >
                  {option.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
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
