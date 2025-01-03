// src/pages/DragAndDrop.tsx
import React, { useState } from "react";
import "../App.css"; // Make sure the styles are included

interface Option {
  id: string;
  text: string;
}

interface Functionality {
  id: string;
  text: string;
}

interface CorrectAnswer {
  toolId: string;
  functionId: string;
}

const data = {
  question: "What does each RGM tool do?",
  instructions: "Drag and drop the tools to match them with their specific functions.",
  options: [
    { id: "PvP", text: "PvP" },
    { id: "AO", text: "AO" },
    { id: "CoPilot", text: "Co Pilot" },
    { id: "TPO", text: "TPO" }
  ],
  functions: [
    { id: "PvP", text: "Portfolio Simulator To Plan Price Impacts" },
    { id: "TPO", text: "FINDS Patterns And Drivers Of Promo Efficiency To Refine Forward-Looking Promo Plans" },
    { id: "CoPilot", text: "Automated & Optimized Pricing Scenarios Based On ML/AI Model That Dynamically Optimizes Sales Forecast" },
    { id: "AO", text: "Optimizer For The Ideal Assortment By Channel And Customer" }
  ],
  correctAnswers: [
    { toolId: "PvP", functionId: "PvP" },
    { toolId: "TPO", functionId: "TPO" },
    { toolId: "CoPilot", functionId: "CoPilot" },
    { toolId: "AO", functionId: "AO" }
  ]
};

const DragAndDrop: React.FC = () => {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const onDrop = (toolId: string, functionId: string) => {
    setMatches((prev) => ({ ...prev, [functionId]: toolId }));
  };

  const checkAnswers = () => {
    const isCorrect = data.correctAnswers.every(
      (answer) => matches[answer.functionId] === answer.toolId
    );
    setFeedback(isCorrect ? "Well done! You matched all tools to their correct functions." : "Some matches are incorrect. Please try again.");
  };

  return (
    <div className="drag-and-drop-container">
      <h1 className="question-title">{data.question}</h1>
      <p className="instructions">{data.instructions}</p>

      {/* Tools Section */}
      <div className="tools-section">
        <h2>Tools</h2>
        <div className="tools-list">
          {data.options.map((option) => (
            <div
              key={option.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("toolId", option.id)}
              className="draggable-tool"
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>

      {/* Functions Section */}
      <div className="functions-section">
        <h2>Functions</h2>
        <div className="functions-list">
          {data.functions.map((func) => (
            <div
              key={func.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e.dataTransfer.getData("toolId"), func.id)}
              className={`drop-zone ${matches[func.id] ? "dropped" : ""}`}
            >
              <p className="function-text">{func.text}</p>
              {matches[func.id] && (
                <div className="matched-tool">{data.options.find((o) => o.id === matches[func.id])?.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={checkAnswers} className="check-button">Check Answers</button>

      {feedback && <p className="feedback-message">{feedback}</p>}
    </div>
  );
};

export default DragAndDrop;
