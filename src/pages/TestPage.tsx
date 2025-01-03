import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DragAndDropQuestion from '../components/DragAndDropQuestion';
// import SelectQuestion from '../components/SelectQuestion';
import CheckboxQuestion from '../components/CheckboxQuestion';

const TestPage: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Get token from URL params
  const [questions, setQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<number>(0); // Time left in seconds
  const [totalTime, setTotalTime] = useState<number>(0); // Time left in seconds

  const [time, setTime] = useState<number>(0); // Remaining time in milliseconds
  const [loading, setLoading] = useState<boolean>(true); // For loading state
  const [error, setError] = useState<string>(''); // For error handling

  useEffect(() => {
    if (token) {
      // Fetch the test details using the token
      axios
        .get(`http://192.168.1.4:3000/test/get/${token}`)
        .then((response) => {
          if (response.data.valid) {
            setQuestions(response.data.test.questions); // Set questions if valid response
            setStartTime(response.data.test.startTime); // Assuming startTime is in seconds
            setTotalTime(response.data.test.totalTime); // Assuming startTime is in seconds
            setLoading(false); // Stop loading
          } else {
            setError('Invalid test session.');
            setLoading(false); // Stop loading
          }
        })
        .catch((error) => {
          console.error('Error fetching test data:', error);
          setError('Error fetching test data');
          setLoading(false); // Stop loading
        });
    }
  }, [token]); // Run effect only when token changes

  // Calculate and format the remaining time
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (startTime && totalTime) {
      // Calculate remaining time based on startTime and totalTime
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime; // Time passed since test started
        const remainingTime = totalTime - elapsedTime; // Remaining time

        if (remainingTime <= 0) {
          clearInterval(interval); // Stop the timer when time expires
          setTime(0); // Ensure time is 0 if expired
        } else {
          setTime(remainingTime);
        }
      }, 1000);

      // Cleanup interval on unmount or if time expires
      return () => clearInterval(interval);
    }
  }, [startTime, totalTime]);


  const handleAnswerSubmit = (questionId: number, answer: any) => {
    if (!token) return; // Prevent submitting answers if token is not available

    // Submit the user's answer for the question
    axios
      .post(`http://192.168.1.153:3000/test/submit/${token}`, { questionId, userAnswer: answer })
      .then((response) => {
        console.log('Answer submitted:', response.data);
      })
      .catch((error) => console.error('Error submitting answer:', error));
  };

  // If loading data, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="test-page">
      <h1>Test</h1>
      <div>
        <p>Time left: {formatTime(time)}</p>
        {time <= 0 && <p>Time's up!</p>}
      </div>
      {questions.length === 0 && <p>No questions available</p>} {/* Check for empty questions */}

      {questions.map((question) => {
        switch (question.questionType) {
          case 'ordering':
            return (
              <DragAndDropQuestion
                key={question.id}
                question={question}
                onAnswerSubmit={(answers) => handleAnswerSubmit(question.id, answers)}
              />

            );
          case 'select':
            return (
              <></>
              // <SelectQuestion
              //   key={question.id}
              //   questionText={question.questionText}
              //   options={question.options}
              //   correctAnswer={question.correctAnswer}
              //   onAnswerSubmit={(answer) => handleAnswerSubmit(question.id, answer)}
              // />
            );
          case 'checkbox':
            return (
              <CheckboxQuestion
                key={question.id}
                questionText={question.questionText}
                options={question.options}
                correctAnswers={question.correctAnswers}
                onAnswerSubmit={(answer) => handleAnswerSubmit(question.id, answer)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default TestPage;
