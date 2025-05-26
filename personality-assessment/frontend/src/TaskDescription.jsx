import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Fade,
  Divider,
} from '@mui/material';
import { useStepGuard, completeStep } from './hooks/useStepGuard';

const taskVariations = {
  creative: {
    title: "Creative Framing",
    description: `You and your business partners started a small company three years ago. After countless late nights, personal sacrifices, and investing your own savings, you've finally developed a product you're truly proud of. This launch represents years of your personal dedication and dreams.

Now that it’s time to bring your product to market, your goal is to create a strong, distinctive launch that resonates with customers. You want the launch to reflect your vision and help the product make a lasting impression in a competitive space. Original thinking, meaningful storytelling, and thoughtful positioning will all contribute to success.`,
    instruction: `Please select four team members you believe would be best suited to tackle the challenges of this launch.`,
    framing: "Creative"
  },
  analytical: {
    title: "Analytical Framing",
    description: `You and your business partners started a small company three years ago. After countless late nights, personal sacrifices, and investing your own savings, you've finally developed a product you're truly proud of. This launch represents years of your personal dedication and dreams.

As you prepare to bring the product to market, your team must develop a thorough, well-structured plan to ensure a successful rollout. This includes strategic use of data, confident decision-making, and effective management of limited resources. Your goal is to deliver results efficiently and reliably while navigating a dynamic market environment.`,
    instruction: `Please select four team members you believe would be best suited to tackle the challenges of this launch.`,
    framing: "Analytical"
  },
  neutral: {
    title: "Neutral Framing",
    description: `You and your business partners started a small company three years ago. After countless late nights, personal sacrifices, and investing your own savings, you've finally developed a product you're truly proud of. This launch represents years of your personal dedication and dreams.

This launch is as critical as it is complex. Your team will need to craft a balanced, comprehensive approach that addresses all key aspects—from outreach and customer experience to operations and growth planning. A successful outcome will depend on your team’s ability to coordinate effectively across different areas and adapt to evolving needs.`,
    instruction: `Please select four team members you believe would be best suited to tackle the challenges of this launch.`,
    framing: "Neutral"
  }
};

const TaskDescription = () => {
  const navigate = useNavigate();
  const [selectedTaskKey, setSelectedTaskKey] = useState(null);

  useStepGuard(2);

  useEffect(() => {
    if (!selectedTaskKey) {
      const taskKeys = Object.keys(taskVariations);
      const randomTaskKey = taskKeys[Math.floor(Math.random() * taskKeys.length)];
      setSelectedTaskKey(randomTaskKey);
      localStorage.setItem('taskCondition', taskVariations[randomTaskKey].framing);
    }
  }, [selectedTaskKey]);

  const handleContinue = () => {
    completeStep(2);
    navigate('/how-to-evaluate');
  };

  if (!selectedTaskKey) return null;

  const selectedTask = taskVariations[selectedTaskKey];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
            Task Description
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" paragraph>
              {selectedTask.description}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {selectedTask.instruction}
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
              Continue to Evaluation Instructions
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default TaskDescription;
