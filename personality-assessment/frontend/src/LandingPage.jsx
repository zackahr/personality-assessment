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
  IconButton,
  useTheme,
  useMediaQuery,
  TextField,
} from '@mui/material';
import {
  Timer,
  Assignment,
  CheckCircle,
  QuestionAnswer,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import { useStepGuard, completeStep, getStepFromPath } from './hooks/useStepGuard';

const LandingPage = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);
  const [prolificId, setProlificId] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Determine current step for the guard
  // For LandingPage, it's always step 0
  useStepGuard(0);

  const handleStart = () => {
    if (!agreed || !prolificId.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    localStorage.setItem('prolificId', prolificId.trim());
    localStorage.setItem('startTime', new Date().toISOString());
    completeStep(0); // Mark step 0 as complete
    navigate('/personality-test');
  };

  const nextSlide = () => {
    if (!prolificId.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setCurrentSlide(1);
  }
  const prevSlide = () => setCurrentSlide(0);

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: isMobile ? 2 : 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: isMobile ? 2 : 4, 
          borderRadius: 2, 
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          mx: 'auto',
        }}
      >
        {currentSlide === 0 ? (
          // Introduction Slide
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1" 
              sx={{ 
                mb: isMobile ? 2 : 4, 
                color: 'primary.main', 
                fontWeight: 'bold',
              }}
            >
              Welcome to the Decision & Personality Study
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              We appreciate your participation!
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              In this study, you'll take on the role of someone assembling a team for a real-world project. You'll review a set of candidate profiles—each describing someone's personality—and make decisions about who you'd want on your team.
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              There are no right or wrong answers. We're interested in how people naturally use personality information when making team-related decisions.
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              Your participation helps us improve how teams are formed in organizations, education, and beyond.
            </Typography>

            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              sx={{ 
                mt: isMobile ? 2 : 4, 
                mb: 2, 
                color: 'primary.dark',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              What You'll Do:
            </Typography>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              mb: 3
            }}>
              <List dense={isMobile} sx={{ 
                width: '100%',
                maxWidth: '600px',
                textAlign: 'left',
                pl: isMobile ? 2 : 4,
              }}>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="1. Take a short personality questionnaire"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="2. Review 20 candidate profiles"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="3. Select the 4 individuals you'd most want on your team"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="4. Reflect briefly on your decisions"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
              </List>
            </Box>

            <Typography 
              variant="subtitle1" 
              sx={{ 
                mt: 2, 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.9rem' : '1rem',
                textAlign: 'center',
                mb: 3
              }}
            >
              Estimated time: 10–15 minutes
            </Typography>

            <Box sx={{ mb: 3, maxWidth: '400px', mx: 'auto' }}>
              <TextField
                fullWidth
                required
                label="Prolific ID"
                variant="outlined"
                value={prolificId}
                onChange={(e) => setProlificId(e.target.value)}
                error={showError && !prolificId.trim()}
                helperText={showError && !prolificId.trim() ? "Prolific ID is required" : ""}
                sx={{ mb: 2 }}
              />
            </Box>

            {showError && !prolificId.trim() && (
              <Alert severity="error" sx={{ mb: 2, justifyContent: 'center', maxWidth: '400px', mx: 'auto' }}>
                Please enter your Prolific ID.
              </Alert>
            )}

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: 2
            }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForward />}
                onClick={nextSlide}
                disabled={!prolificId.trim()}
                sx={{ 
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  px: isMobile ? 2 : 3,
                  py: isMobile ? 1 : 1.5
                }}
              >
                Continue to Consent Form
              </Button>
            </Box>
          </Box>
        ) : (
          // Consent Form Slide
          <Box sx={{ textAlign: 'center' }}>
            <IconButton 
              onClick={prevSlide} 
              sx={{ 
                position: 'absolute', 
                left: isMobile ? 8 : 16, 
                top: isMobile ? 8 : 16,
                p: isMobile ? 0.5 : 1
              }}
            >
              <ArrowBack fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1" 
              sx={{ 
                mb: isMobile ? 2 : 4, 
                color: 'primary.main', 
                fontWeight: 'bold',
                mt: isMobile ? 1 : 0
              }}
            >
              Consent
            </Typography>

            <Box sx={{
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              pr: 2,
              mb: 3
            }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ fontWeight: 'bold' }}>
                Study Title: Decision-Making and Personality in Team Formation
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                Thank you for your interest in this research study. Before you begin, please take a moment to review the information below. It outlines your rights as a participant, how your data will be used, and what to expect.
              </Typography>
              
              <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                Key Information
              </Typography>
              
              <List dense sx={{ pl: 2, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Purpose:</Typography> To study how people evaluate others based on personality traits during team formation.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Tasks:</Typography> You will complete a personality questionnaire, evaluate a set of profiles, select team members, and answer brief reflection questions.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Duration:</Typography> 10–15 minutes.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Voluntary Participation:</Typography> You may stop at any time by closing your browser. You will not be penalized in any way.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Risks:</Typography> There are no anticipated risks associated with this study.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Benefits:</Typography> There are no direct personal benefits. However, your participation contributes to research on decision-making, personality, and teamwork.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Compensation:</Typography> You will be compensated through Prolific in accordance with the platform's guidelines.
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>Confidentiality:</Typography> No personal or identifying data will be collected. Your Prolific ID is used only for compensation purposes and will not be linked to your responses. All data will be stored securely and anonymously.
                </ListItem>
              </List>
              
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem', mt: 2 }}>
                You must be:
              </Typography>
              <List dense sx={{ pl: 2, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  At least 18 years old
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  Fluent in English
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  Providing informed consent voluntarily
                </ListItem>
              </List>
              
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem', mt: 2 }}>
                If you have any questions, you may contact the research team at any time via Prolific's messaging system.
              </Typography>
              
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem', mt: 2, fontWeight: 'bold' }}>
                By continuing, you indicate that:
              </Typography>
              <List dense sx={{ pl: 2, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  You have read and understood the information above
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  You voluntarily agree to participate
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  You meet the eligibility requirements
                </ListItem>
              </List>
            </Box>

            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
              label="I Agree to Participate"
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />

            {showError && !agreed && (
              <Alert severity="error" sx={{ mt: 2, justifyContent: 'center', maxWidth: '400px', mx: 'auto' }}>
                You must agree to participate to proceed.
              </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStart}
                disabled={!agreed}
                sx={{
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  px: isMobile ? 2 : 3,
                  py: isMobile ? 1 : 1.5
                }}
              >
                I Agree / Start Study
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default LandingPage;