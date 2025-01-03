// src/components/SelectQuestion.tsx
import React, { useState } from 'react';

interface SelectQuestionProps {
  questionText: string;
  options: string[];
  correctAnswer: string;
  onAnswerSubmit: (answer: string) => void;
}

const SelectQuestion: React.FC<SelectQuestionProps> = ({ questionText, options, correctAnswer, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setSelectedOption(answer);
    onAnswerSubmit(answer);
  };

  return (
    <div className="select-question">
      <h3>{questionText}</h3>
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={handleChange}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectQuestion;
