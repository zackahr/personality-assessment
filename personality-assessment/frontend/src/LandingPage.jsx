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

const LandingPage = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);
  const [prolificId, setProlificId] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStart = () => {
    if (!agreed || !prolificId.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    localStorage.setItem('prolificId', prolificId.trim());
    localStorage.setItem('startTime', new Date().toISOString());
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
        minHeight: '100vh', // Ensure container takes full viewport height
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: isMobile ? 2 : 4, 
          borderRadius: 2, 
          position: 'relative',
          overflow: 'hidden',
          width: '100%', // Ensure paper takes full width of container
          mx: 'auto', // Center horizontally
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
              Welcome to the Personality and Team Formation Study
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              Thank you for participating!
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              This study explores how people make decisions when forming teams. You will take on the role of someone assembling a team for a collaborative project, and your task is to select team members based on personality profiles.
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              mb: 3
            }}>
              There are no right or wrong answers—please respond according to your own preferences and instincts.
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
                    primary="1. Complete a brief personality questionnaire (BFI-10)"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="2. Review and evaluate 20 personality profiles"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="3. Select four profiles to form your team"
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary="4. Reflect on your choices by answering a few short questions"
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
              Estimated total time: 10–15 minutes
            </Typography>

            <Typography 
              variant="body2"
              sx={{
                mt: isMobile ? 2 : 3,
                mb: isMobile ? 3 : 4,
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                textAlign: 'left',
                mx: 'auto',
                maxWidth: '800px',
                fontStyle: 'italic',
                color: 'text.secondary'
              }}
            >
              The personality profiles you'll see are based on real-world data and describe typical behavioral patterns. Your responses will help us understand how personality traits influence team-building decisions.
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
              Informed Consent
            </Typography>

            <Box sx={{
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px',
              maxHeight: isMobile ? 'calc(100vh - 300px)' : 'calc(100vh - 350px)',
              overflowY: 'auto',
              pr: 2,
              mb: 3
            }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ fontWeight: 'bold' }}>
                Study Title: Personality and Team Choice Study
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                Thank you for your interest in this study!
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                This research explores how people make decisions based on personality when forming teams. You'll be asked to complete a short personality questionnaire, review a set of personality profiles, select four team members, and briefly reflect on your choices.
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                The study takes about 10–15 minutes. Participation is entirely voluntary—you may withdraw at any time by closing your browser. There are no penalties for withdrawing.
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                There are no known risks involved. While there are no direct benefits, your responses will contribute to research on teamwork and decision-making.
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                Your data will remain anonymous and securely stored. No identifying information will be collected, and your Prolific ID will not be linked to your answers.
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                If you have any questions, you can contact the research team via Prolific messaging.
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontSize: isMobile ? '0.85rem' : '0.95rem', mt: 2, fontWeight: 'bold' }}>
                By clicking "I Agree," you confirm that you:
              </Typography>
              <List dense sx={{ pl: 2, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  Have read and understood the information above
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  Voluntarily agree to participate
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 0, pt: 0, pb: 0 }}>
                  Are at least 18 years old
                </ListItem>
              </List>
            </Box>

            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
              label="I have read, understood, and agree to participate."
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