// src/pages/topicPages/Topic2Page.tsx
import { Typography, Button, Stepper, Step, StepLabel, Box } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Topic2Page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0); // Track the active step

  // Content for each step
  const stepsContent = [
    {
      label: "Step 1: Introduction to RGM Tools",
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
      label: "Step 2: Key RGM Tools",
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
      label: "Step 3: How RGM Tools Impact Pricing",
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
      label: "Step 4: Assortment and Promotions",
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
          <Link to="/test/topic1">
            <Button variant="contained" color="primary">Start Test</Button>
          </Link>
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
    <div className="container my-5">
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

export default Topic2Page;
