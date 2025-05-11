import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fade
} from '@mui/material';
import { useStepGuard, completeStep, getStepFromPath } from './hooks/useStepGuard';

const HowToEvaluatePage = () => {
  const navigate = useNavigate();

  // Current step for the guard
  useStepGuard(3);

  const handleContinue = () => {
    completeStep(3); // Mark step 3 as complete
    navigate('/profile/1'); // Navigate to the first profile
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
            How to Evaluate Profiles
          </Typography>

          <Typography variant="body1" paragraph>
            Now that you know the task, you'll read short profiles of people based on their personality.
          </Typography>
          <Typography variant="body1" paragraph>
            Each profile shows how someone typically behaves in teams or at work, using five traits:
          </Typography>

          <List dense sx={{ pl: 2, mb: 2, backgroundColor: 'grey.50', borderRadius: 1, p: 1 }}>
            <ListItem sx={{ pl: 0, pt: 0, pb: 0.5 }}>
              <ListItemText primary="· Extraversion (Outgoing) – how outgoing or quiet they are" />
            </ListItem>
            <ListItem sx={{ pl: 0, pt: 0, pb: 0.5 }}>
              <ListItemText primary="· Openness (Creativity) – how curious or creative they are" />
            </ListItem>
            <ListItem sx={{ pl: 0, pt: 0, pb: 0.5 }}>
              <ListItemText primary="· Conscientiousness (Organization) – how organized or reliable they are" />
            </ListItem>
             <ListItem sx={{ pl: 0, pt: 0, pb: 0.5 }}>
               <ListItemText primary="· Emotional Stability – how calm or stressed they usually are" />
             </ListItem>
            <ListItem sx={{ pl: 0, pt: 0, pb: 0.5 }}>
              <ListItemText primary="· Agreeableness (Friendliness) – how friendly or cooperative they are" />
            </ListItem>
          </List>

          <Typography variant="body1" paragraph>
             Each trait is labeled as Low, Moderate, or High, and the profile includes a short description of what that combination might look like in real life.
           </Typography>
          <Typography variant="body1" paragraph>
            Just read each profile and decide: <Typography component="span" sx={{ fontWeight: 'bold' }}>Yes, Maybe, or No</Typography> regarding whether you'd consider them for your team.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
            By the end, you'll choose ONLY 4 people to join your team. You can always revise your choices before submitting.
          </Typography>

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
              Continue to Profile Selection
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default HowToEvaluatePage;