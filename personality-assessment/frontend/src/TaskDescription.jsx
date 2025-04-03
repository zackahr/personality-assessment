import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Fade,
} from '@mui/material';

const conditions = {
  creative: {
    title: "Creative Condition",
    description: `You are responsible for assembling a team that will develop innovative solutions to
    address sustainability challenges on university campuses. This project requires creative
    thinking, generating novel ideas, and exploring unconventional approaches. The most
    successful teams will be those that can think outside the box and develop original
    concepts.`,
    goal: `The team's specific goal is to create new initiatives that could significantly reduce campus
    waste, energy consumption, or water usage while engaging the student body. They'll need
    to brainstorm ideas, develop concepts, and create proposals that are both innovative and
    implementable.`
  },
  analytical: {
    title: "Analytical Condition",
    description: `You are responsible for assembling a team that will analyze sustainability data from
    university campuses to identify improvement opportunities. This project requires
    systematic analysis, careful evaluation of evidence, and logical problem-solving. The most
    successful teams will be those that can thoroughly examine information and draw well-
    reasoned conclusions.`,
    goal: `The team's specific goal is to analyze data on campus waste, energy consumption, and
    water usage to identify patterns, inefficiencies, and opportunities for improvement. They'll
    need to examine metrics, evaluate current practices, and develop evidence-based
    recommendations.`
  },
  neutral: {
    title: "Project Description",
    description: `You are responsible for assembling a team that will work on a sustainability project for
    university campuses. They'll need to work together effectively to complete various tasks
    and achieve project goals. The most successful teams will be those that address the
    challenge efficiently.`,
    goal: `The team's specific goal is to improve campus practices related to waste, energy
    consumption, or water usage. They'll need to understand the current situation, develop
    appropriate solutions, and create recommendations for implementation.`
  }
};

const TaskDescription = () => {
  const navigate = useNavigate();
  const [condition, setCondition] = useState(null);

  useEffect(() => {
    // Randomly select a condition if not already set
    if (!condition) {
      const conditionTypes = Object.keys(conditions);
      const randomCondition = conditionTypes[Math.floor(Math.random() * conditionTypes.length)];
      setCondition(randomCondition);
      // Store the condition in localStorage for later use
      localStorage.setItem('taskCondition', randomCondition);
    }
  }, [condition]);

  const handleContinue = () => {
    navigate('/profile/1');
  };

  if (!condition) return null;

  const selectedCondition = conditions[condition];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
            {selectedCondition.title}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Task Description
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedCondition.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Team Goal
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedCondition.goal}
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
            Please select individuals who you believe would form an effective team for this {condition === 'creative' ? 'creative' : condition === 'analytical' ? 'analytical' : ''} challenge.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleContinue}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }
              }}
            >
              Continue to Profile Selection
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default TaskDescription; 