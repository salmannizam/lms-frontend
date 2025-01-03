// src/pages/ResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Result {
  questionId: number;
  isCorrect: boolean;
  userAnswer: string;
}

const ResultsPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the results of the test using the token
    if (token) {
      axios
        .get(`http://192.168.1.4:3000/test/results/${token}`)
        .then((response) => {
          if (response.data.valid) {
            setResults(response.data.results);
          } else {
            setError(response.data.message || 'Error fetching results');
          }
        })
        .catch((error) => {
          console.error('Error fetching results:', error);
          setError('An error occurred while fetching results.');
        });
    }
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!results) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="results-container">
      <h1>Test Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.questionId}>
            Question {result.questionId}: {result.isCorrect ? 'Correct' : 'Incorrect'} - Answered: {result.userAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
