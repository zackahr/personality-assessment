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
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStart = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    localStorage.setItem('startTime', new Date().toISOString());
    navigate('/personality-test');
  };

  const nextSlide = () => setCurrentSlide(1);
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
              Welcome to the Team Assembly Study
            </Typography>

            <Typography variant="body1" paragraph sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              textAlign: 'left',
              mx: 'auto',
              maxWidth: '800px'
            }}>
              In this study, we are investigating how people assemble teams when given specific tasks.
              Your role will be as someone responsible for selecting team members for a project. Your
              choices will help us better understand the factors that influence team composition
              decisions.
            </Typography>

            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              sx={{ 
                mt: isMobile ? 2 : 4, 
                mb: 2, 
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              The study consists of four parts:
            </Typography>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              <List dense={isMobile} sx={{ 
                width: '100%',
                maxWidth: '800px'
              }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: isMobile ? 36 : 48 }}>
                    <Assignment fontSize={isMobile ? "small" : "medium"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="A brief personality assessment about yourself"
                    secondary={isMobile ? "(~2 min)" : "(approx. 2 minutes)"}
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                    secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: isMobile ? 36 : 48 }}>
                    <Timer fontSize={isMobile ? "small" : "medium"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Evaluating potential candidates for your team"
                    secondary={isMobile ? "(~5-7 min)" : "(approx. 5-7 minutes)"}
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                    secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: isMobile ? 36 : 48 }}>
                    <CheckCircle fontSize={isMobile ? "small" : "medium"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Making your final team member selections"
                    secondary={isMobile ? "(~2 min)" : "(approx. 2 minutes)"}
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                    secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: isMobile ? 36 : 48 }}>
                    <QuestionAnswer fontSize={isMobile ? "small" : "medium"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Answering a few reflection questions"
                    secondary={isMobile ? "(~3 min)" : "(approx. 3 minutes)"}
                    primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                    secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
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
                textAlign: 'center'
              }}
            >
              Total estimated time: {isMobile ? '12-15 min' : '12-15 minutes'}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mt: isMobile ? 2 : 3, 
                mb: isMobile ? 2 : 4,
                fontSize: isMobile ? '0.9rem' : '1rem',
                textAlign: 'left',
                mx: 'auto',
                maxWidth: '800px'
              }}
            >
              Please answer honestly - there are no right or wrong answers. We're interested in your
              natural selection preferences and decision-making process.
            </Typography>

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
              maxWidth: '800px'
            }}>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                gutterBottom
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                Study Title: Team Assembly and Decision Making
              </Typography>

              <Typography 
                variant="body1" 
                paragraph
                sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                Principal Investigators: [Your Name], supervised by Prof. Mehdi and Prof. Fatimazzahra
              </Typography>

              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mt: isMobile ? 1 : 2,
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}
              >
                Purpose:
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                This research examines how individuals make decisions when assembling teams for specific tasks.
              </Typography>

              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mt: isMobile ? 1 : 2,
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}
              >
                Risks and Benefits:
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                There are no anticipated risks associated with this study. While there is no direct benefit to you,
                your participation will contribute to our understanding of team assembly processes.
              </Typography>

              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mt: isMobile ? 1 : 2,
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}
              >
                Confidentiality:
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                Your responses will be anonymous. All data collected will be stored securely and used only for
                research purposes. No identifying information will be collected.
              </Typography>

              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mt: isMobile ? 1 : 2,
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}
              >
                Voluntary Participation:
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                Your participation is entirely voluntary. You may withdraw at any time without penalty by closing
                your browser window.
              </Typography>

              {showError && !agreed && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mt: 2,
                    fontSize: isMobile ? '0.8rem' : '0.875rem'
                  }}
                >
                  Please agree to the consent form to continue
                </Alert>
              )}

              <Box sx={{ 
                mt: isMobile ? 2 : 3,
                display: 'flex',
                justifyContent: 'center'
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    />
                  }
                  label={
                    <Typography sx={{ 
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      textAlign: 'left'
                    }}>
                      I have read and understood this information, voluntarily agree to participate, and am at least 18 years of age
                    </Typography>
                  }
                  sx={{ 
                    alignItems: 'flex-start',
                    maxWidth: '800px'
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ 
              mt: isMobile ? 3 : 4, 
              display: 'flex', 
              justifyContent: 'center',
              mb: isMobile ? 1 : 0
            }}>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                onClick={handleStart}
                sx={{
                  px: isMobile ? 4 : 6,
                  py: isMobile ? 1 : 1.5,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
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
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default LandingPage;