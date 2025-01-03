// src/components/CheckboxQuestion.tsx
import React, { useState } from 'react';

interface CheckboxQuestionProps {
  questionText: string;
  options: string[];
  correctAnswers: string[];
  onAnswerSubmit: (answers: string[]) => void;
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({ questionText, options, correctAnswers, onAnswerSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAnswers((prevAnswers) => {
      if (prevAnswers.includes(value)) {
        return prevAnswers.filter((answer) => answer !== value);
      } else {
        return [...prevAnswers, value];
      }
    });
  };

  React.useEffect(() => {
    onAnswerSubmit(selectedAnswers);
  }, [selectedAnswers, onAnswerSubmit]);

  return (
    <div className="checkbox-question">
      <h3>{questionText}</h3>
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              value={option}
              checked={selectedAnswers.includes(option)}
              onChange={handleChange}
            />
            <label htmlFor={`checkbox-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
