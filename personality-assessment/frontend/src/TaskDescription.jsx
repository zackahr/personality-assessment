import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useStepGuard, completeStep, getStepFromPath } from './hooks/useStepGuard';

const scenario = {
  title: "GlobaTech International Expansion Initiative",
  description: `You are part of a strategic task force at GlobaTech, a fast-growing company that manufactures smart home appliances. GlobaTech is planning to expand into a new international market, and your team has been asked to lead this initiative. The project includes:`,
  points: [
    "Market Selection: Choosing the most promising country or region for entry.",
    "Product Strategy: Deciding which product lines to introduce and how to position them.",
    "Operational Planning: Assessing logistics, partnerships, and regulatory considerations to ensure a successful launch."
  ]
};

const taskVariations = {
  creative: {
    title: "Task: Innovative Market Entry",
    description: `We're looking for a bold and original approach to international expansion. Think beyond conventional strategies—how can GlobaTech surprise and engage a new audience? We encourage imaginative thinking, fresh branding ideas, and creative product-market fit solutions. You have the freedom to explore new directions for the company's global future.`,
    instruction: `You are in charge of assembling a team to lead this project. We will show you several personality profiles; please choose four people whom you believe will work best on this task.`,
    framing: "Creative Framing"
  },
  analytical: {
    title: "Task: Data-Driven Market Analysis",
    description: `This project will require careful analysis of international market trends, cost structures, competitive landscapes, and legal constraints. We need a rigorous, evidence-based plan to ensure GlobaTech's success in a new region. Systematic thinking, data interpretation, and strategic risk assessment will be key.`,
    instruction: `You are in charge of assembling a team to lead this project. We will show you several personality profiles; please choose four people whom you believe will work best on this task.`,
    framing: "Analytical Framing"
  },
  neutral: {
    title: "Task: Strategic Expansion Plan",
    description: `You are tasked with developing a viable strategy for GlobaTech to expand into a new international market. Consider product strategy, market selection, and operational planning. There's no single right way—just ensure your proposal is well-rounded and addresses the key components for a successful expansion.`,
    instruction: `You are in charge of assembling a team to lead this project. We will show you several personality profiles; please choose four people whom you believe will work best on this task.`,
    framing: "Neutral (Control) Framing"
  }
};

const TaskDescription = () => {
  const navigate = useNavigate();
  const [selectedTaskKey, setSelectedTaskKey] = useState(null);

  // Current step for the guard
  useStepGuard(2);

  useEffect(() => {
    // Randomly select a task variation if not already set
    if (!selectedTaskKey) {
      const taskKeys = Object.keys(taskVariations);
      const randomTaskKey = taskKeys[Math.floor(Math.random() * taskKeys.length)];
      setSelectedTaskKey(randomTaskKey);
      // Store the framing in localStorage for later use
      localStorage.setItem('taskCondition', taskVariations[randomTaskKey].framing);
    }
  }, [selectedTaskKey]);

  const handleContinue = () => {
    completeStep(2); // Mark step 2 as complete
    navigate('/how-to-evaluate');
  };

  if (!selectedTaskKey) return null;

  const selectedTask = taskVariations[selectedTaskKey];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
            {scenario.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
              Overall Scenario:
            </Typography>
            <Typography variant="body1" paragraph>
              {scenario.description}
            </Typography>
            <List dense sx={{ pl: 2, mb: 2 }}>
              {scenario.points.map((point, index) => (
                <ListItem key={index} sx={{ pl: 0, pt: 0, pb: 0.5 }}>
                  <ListItemText primary={`• ${point}`} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'secondary.main', fontWeight: 'bold' }}>
              Your Task
            </Typography>
            <Typography variant="body1" paragraph >
              {selectedTask.description}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedTask.instruction}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />

          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Please select individuals who you believe would form an effective team for the task described above.
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