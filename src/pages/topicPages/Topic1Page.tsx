// src/pages/topicPages/Topic1Page.tsx
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // updated import for React Router v6

const Topic1Page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);  // Track active step
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState<string | null>(null);  // Track error state
  const navigate = useNavigate();  // useNavigate hook for navigation

    // Function to start the test (API call)
  // Start test handler
  const handleStartTest = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make the API call to get the token and test data
      const response = await axios.post('http://192.168.1.153:3000/test/start/test1');
      const { valid, token } = response.data;

      if (valid) {
        // Redirect to the Test Page with token as a query parameter
        navigate(`/test/${token}`);
      } else {
        setError('Failed to start the test. Please try again later.');
      }
    } catch (err) {
      setError('Error while starting the test.');
    } finally {
      setLoading(false);
    }
  };

  const stepsContent = [
    {
      label: "Step 1: RGM ORIENTED COMPANIES INTRODUCTION - VALUE GENERATION",
      content: (
        <>
          <Typography variant="h6">What is RGM?</Typography>
          <p>
            RGM stands for Revenue Growth Management, which helps businesses optimize pricing, assortment, and promotion strategies to drive growth.
          </p>
        </>
      ),
    },
    {
      label: "Step 2: WHY DATA DRIVEN RGM SOLUTIONS ARE CRITICAL FOR LATAM",
      content: (
        <>
          <Typography variant="h6">Overview of RGM Tools</Typography>
          <p>
            The RGM Toolkit includes tools like PvP, AO, TPO, and CoPilot, each designed to support specific aspects of pricing and assortment.
          </p>
        </>
      ),
    },
    {
      label: "Step 3: RGMx VISION: OUR PURPOSE AND HORIZONS (FROM DEMOCRATIZE TO GEN AI TOOLS)",
      content: (
        <>
          <Typography variant="h6">Optimizing Pricing with RGM Tools</Typography>
          <p>
            Learn how tools like PvP and AO can optimize pricing strategies by analyzing market conditions and customer behavior.
          </p>
        </>
      ),
    },
    {
      label: "Step 4: RGMx VISION: PRESENTATION OF SOLUTIONS & HOW THEY CONNECT TO THE BUSINESS AND AMONG THEMSELVES",
      content: (
        <>
          <Typography variant="h6">Assortment Planning and Promotions</Typography>
          <p>
            Discover how assortment planning and promotions can be enhanced with RGM tools like TPO and CoPilot.
          </p>
        </>
      ),
    },
    {
      label: "Step 5: Ready for the Test?",
      content: (
        <>
          <Typography variant="h6">You're Almost Ready!</Typography>
          <p>
            Review everything you've learned about RGM tools and their application. When you're ready, click below to start the test.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartTest}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start Test'}
          </Button>
        </>
      ),
    },
  ];




  // Function to go to the next step
  const handleNext = () => {
    if (activeStep < stepsContent.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Function to go to the previous step
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="container my-5 mx-5">
      <h1 className="text-center mb-4">RGM Tool Knowledge Test</h1>

      <Stepper activeStep={activeStep} alternativeLabel>
        {stepsContent.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ p: 3 }}>
        {stepsContent[activeStep].content}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          color="secondary"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
        >
          {activeStep === stepsContent.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </div>
  );
};

export default Topic1Page;
