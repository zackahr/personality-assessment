import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Fade
} from '@mui/material';
import { useStepGuard, completeStep } from './hooks/useStepGuard';

const HowToEvaluatePage = () => {
  const navigate = useNavigate();

  // Guard to ensure correct step
  useStepGuard(3);

  const handleContinue = () => {
    completeStep(3);
    navigate('/profile/1');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 3,
              color: 'primary.main',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            How the Profiles Work
          </Typography>

          <Typography variant="body1" paragraph>
            You’ll now evaluate a series of short personality profiles, each representing a potential team member. These profiles are based on personality assessment of real people. Each profile includes a short description and shows five personality traits. Here's what they mean:
          </Typography>

          <Typography variant="body1" paragraph>
            · <strong>Openness to Experience</strong> – Creativity, curiosity, willingness to explore new ideas
            <br />
            · <strong>Conscientiousness</strong> – Organization, reliability, attention to detail
            <br />
            · <strong>Extraversion</strong> – Sociability, assertiveness, energy in social situations
            <br />
            · <strong>Agreeableness</strong> – Cooperation, empathy, sensitivity to others
            <br />
            · <strong>Emotional Stability</strong> (opposite of Neuroticism) – Calmness, resilience, stress management
          </Typography>

          <Typography variant="body1" paragraph>
            Each trait is presented as Low, Moderate, or High, along with a description of how that trait level typically appears in behavior.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
          >
            What You’ll Do
          </Typography>

          <Typography variant="body1" paragraph>
            You’ll first sort profiles as Yes, Maybe, or No , based on whether you'd consider them for your team. At the end, you’ll choose exactly 4 people to form your final team. You can change your selections before submitting.
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            There’s no right answer—focus on what you believe makes a great team.
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

export default HowToEvaluatePage;
