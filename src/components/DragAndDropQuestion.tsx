import React, { useState, useEffect } from 'react';

interface ToolOption {
  id: string;
  text: string;
}

interface FunctionOption {
  id: string;
  text: string;
}

interface Answer {
  functionId: string;
  toolId: string;
}

interface Question {
  questionText: string;
  options: ToolOption[];
  functions: FunctionOption[];
  correctAnswers: Answer[];
}

interface DragAndDropProps {
  question: Question | null;
  onAnswerSubmit: (answer: Answer[]) => void; // Callback to submit the answer
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ question, onAnswerSubmit }) => {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [availableTools, setAvailableTools] = useState<ToolOption[]>(question?.options || []);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Debugging hook for logging state changes
  useEffect(() => {
    console.log("Updated Matches:", matches);
  }, [matches]);

  useEffect(() => {
    console.log("Updated Available Tools:", availableTools);
  }, [availableTools]);

  const onDrop = (toolId: string, functionId: string) => {
    const tool = availableTools.find((tool) => tool.id === toolId);
    if (!tool) return; // Edge case if the tool is not found

    console.log("Before Drop:");
    console.log("Available Tools:", availableTools);
    console.log("Matches:", matches);
    console.log("Tool dropped:", tool);

    // If the function already has a tool assigned, remove the previous one and return it to the tool list
    const previousToolId = matches[functionId];
    if (previousToolId) {
      // Find the previous tool and return it to the list of available tools
      const previousTool = availableTools.find((t) => t.id === previousToolId);
      if (previousTool) {
        // Add previous tool back to the available tools list only if it isn't already there
        setAvailableTools((prevTools) => {
          // Check if previous tool exists already, otherwise add it back
          if (!prevTools.some((t) => t.id === previousTool.id)) {
            return [...prevTools, previousTool];
          }
          return prevTools;
        });
      }
    }

    // Assign the new tool to this function and remove it from the available tools
    setMatches((prevMatches) => ({ ...prevMatches, [functionId]: toolId }));
    setAvailableTools((prevTools) => prevTools.filter((t) => t.id !== toolId));
  };

  // Check answers after matching
  const checkAnswers = () => {
    if (!question) return;

    const matchedAnswers = Object.entries(matches).map(([functionId, toolId]) => ({
      functionId,
      toolId,
    }));

    // Submit the answer
    onAnswerSubmit(matchedAnswers);

    const isCorrect = question.correctAnswers.every(
      (answer) => matches[answer.functionId] === answer.toolId
    );

    setFeedback(isCorrect ? "Well done! You matched all tools to their correct functions." : "Some matches are incorrect. Please try again.");
  };

  // If question data is not yet available, show loading
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="drag-and-drop-container">
      <h1 className="question-title">{question.questionText}</h1>

      <div className="tools-section">
        <h2>Tools</h2>
        <div className="tools-list">
          {availableTools.map((option) => (
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

      <div className="functions-section">
        <h2>Functions</h2>
        <div className="functions-list">
          {question.functions.map((func) => (
            <div key={func.id} className="function-item">
              <div
                className={`drop-zone ${matches[func.id] ? 'dropped' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e.dataTransfer.getData("toolId"), func.id)}
              >
                {matches[func.id] && (
                  <div className="matched-tool">
                    {question.options.find((o) => o.id === matches[func.id])?.text || "No Tool"}
                  </div>
                )}
              </div>
              <span className="function-text">{func.text}</span>
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
