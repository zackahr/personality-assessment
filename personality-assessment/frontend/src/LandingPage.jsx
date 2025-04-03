import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import {
  Timer,
  Assignment,
  CheckCircle,
  QuestionAnswer,
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    // Save start time to localStorage
    localStorage.setItem('startTime', new Date().toISOString());
    navigate('/personality-test');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Introduction Section */}
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
          Welcome to the Team Assembly Study
        </Typography>

        <Typography variant="body1" paragraph>
          In this study, we are investigating how people assemble teams when given specific tasks.
          Your role will be as someone responsible for selecting team members for a project. Your
          choices will help us better understand the factors that influence team composition
          decisions.
        </Typography>

        {/* Study Parts Section */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, color: 'primary.main' }}>
          The study consists of four parts:
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText 
              primary="A brief personality assessment about yourself"
              secondary="(approx. 2 minutes)"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Timer />
            </ListItemIcon>
            <ListItemText 
              primary="Evaluating potential candidates for your team"
              secondary="(approx. 5-7 minutes)"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText 
              primary="Making your final team member selections"
              secondary="(approx. 2 minutes)"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText 
              primary="Answering a few reflection questions"
              secondary="(approx. 3 minutes)"
            />
          </ListItem>
        </List>

        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Total estimated time: 12-15 minutes
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
          Please answer honestly - there are no right or wrong answers. We're interested in your
          natural selection preferences and decision-making process.
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Consent Form Section */}
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
          INFORMED CONSENT
        </Typography>

        <Typography variant="h6" gutterBottom>
          Study Title: Team Assembly and Decision Making
        </Typography>

        <Typography variant="body1" paragraph>
          Principal Investigators: [Your Name], supervised by Prof. Mehdi and Prof. Fatimazzahra
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Purpose:
        </Typography>
        <Typography variant="body1" paragraph>
          This research examines how individuals make decisions when assembling teams for specific tasks.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Risks and Benefits:
        </Typography>
        <Typography variant="body1" paragraph>
          There are no anticipated risks associated with this study. While there is no direct benefit to you,
          your participation will contribute to our understanding of team assembly processes.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Confidentiality:
        </Typography>
        <Typography variant="body1" paragraph>
          Your responses will be anonymous. All data collected will be stored securely and used only for
          research purposes. No identifying information will be collected.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Voluntary Participation:
        </Typography>
        <Typography variant="body1" paragraph>
          Your participation is entirely voluntary. You may withdraw at any time without penalty by closing
          your browser window.
        </Typography>

        {showError && !agreed && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Please agree to the consent form to continue
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                color="primary"
              />
            }
            label="I have read and understood this information, voluntarily agree to participate, and am at least 18 years of age"
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStart}
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
            Start Study
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LandingPage; 