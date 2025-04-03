import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box, Grid, Fade, Chip, LinearProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const ProfileViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profileId = parseInt(id, 10);

  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);

  const [yesProfiles, setYesProfiles] = useState([]);
  const [maybeProfiles, setMaybeProfiles] = useState([]);
  const [noProfiles, setNoProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profiles/');
        const data = await response.json();
        setProfiles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleNext = () => {
    const availableProfiles = Object.keys(profiles).filter(
      (id) => !noProfiles.includes(parseInt(id, 10))
    );
    const currentIndex = availableProfiles.indexOf(profileId.toString());
    const nextIndex = (currentIndex + 1) % availableProfiles.length;
    const nextProfileId = availableProfiles[nextIndex];
    navigate(`/profile/${nextProfileId}`);
  };

  const handlePrevious = () => {
    const availableProfiles = Object.keys(profiles).filter(
      (id) => !noProfiles.includes(parseInt(id, 10))
    );
    const currentIndex = availableProfiles.indexOf(profileId.toString());
    const previousIndex = (currentIndex - 1 + availableProfiles.length) % availableProfiles.length;
    const previousProfileId = availableProfiles[previousIndex];
    navigate(`/profile/${previousProfileId}`);
  };

  const handleResponse = async (response) => {
    let updatedYesProfiles = [...yesProfiles];
    let updatedMaybeProfiles = [...maybeProfiles];
    let updatedNoProfiles = [...noProfiles];

    if (response === 'yes' && yesProfiles.length < 4) {
      updatedYesProfiles = [...yesProfiles, profileId];
      setYesProfiles(updatedYesProfiles);
    } else if (response === 'maybe') {
      updatedMaybeProfiles = [...maybeProfiles, profileId];
      setMaybeProfiles(updatedMaybeProfiles);
    } else if (response === 'no') {
      updatedNoProfiles = [...noProfiles, profileId];
      setNoProfiles(updatedNoProfiles);
    }

    // Save selections to backend
    try {
      await fetch('http://localhost:8000/api/selections/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'temp', // You might want to add actual user ID
          yesProfiles: updatedYesProfiles,
          maybeProfiles: updatedMaybeProfiles,
        }),
      });
    } catch (error) {
      console.error('Error saving selections:', error);
    }

    handleNext();
  };

  const handleSubmit = () => {
    // Save the 4 "Yes" profiles to localStorage
    localStorage.setItem('yesProfiles', JSON.stringify(yesProfiles));
    console.log('Yes profiles saved to localStorage:', yesProfiles);

    // Navigate to the "/why" page with the selected profiles
    navigate('/why', { state: { selectedProfiles: yesProfiles } });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  const profile = profiles[profileId];
  if (!profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h4" color="error">Profile not found</Typography>
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        width: '90%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <Fade in timeout={500}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          {/* Progress Bar-like Navigation with Numbers */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3, 
            mb: 4,
            flexWrap: 'wrap',
            maxWidth: '100%',
            px: 2
          }}>
            {Object.keys(profiles).map((id) => {
              const currentProfileId = parseInt(id, 10);

              let chipStyle = {
                width: 60,
                height: 60,
                fontSize: '1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '50%',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                },
              };

              if (noProfiles.includes(currentProfileId)) {
                chipStyle = {
                  ...chipStyle,
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': {
                    ...chipStyle['&:hover'],
                    bgcolor: 'error.dark',
                  }
                };
              } else if (yesProfiles.includes(currentProfileId)) {
                chipStyle = {
                  ...chipStyle,
                  bgcolor: 'success.main',
                  color: 'white',
                  '&:hover': {
                    ...chipStyle['&:hover'],
                    bgcolor: 'success.dark',
                  }
                };
              } else if (maybeProfiles.includes(currentProfileId)) {
                chipStyle = {
                  ...chipStyle,
                  bgcolor: 'warning.main',
                  color: 'black',
                  '&:hover': {
                    ...chipStyle['&:hover'],
                    bgcolor: 'warning.dark',
                  }
                };
              } else if (profileId === currentProfileId) {
                chipStyle = {
                  ...chipStyle,
                  bgcolor: 'primary.main',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    ...chipStyle['&:hover'],
                    bgcolor: 'primary.dark',
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                  }
                };
              } else {
                chipStyle = {
                  ...chipStyle,
                  bgcolor: 'grey.100',
                  color: 'text.primary',
                  '&:hover': {
                    ...chipStyle['&:hover'],
                    bgcolor: 'grey.200',
                  }
                };
              }

              return (
                <Chip
                  key={currentProfileId}
                  label={currentProfileId}
                  onClick={() => navigate(`/profile/${currentProfileId}`)}
                  sx={chipStyle}
                />
              );
            })}
          </Box>

          {/* Profile Content */}
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              color: 'primary.main',
              textAlign: 'center'
            }}
          >
            Profile #{profileId}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                '& > *': {
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.04)',
                    transform: 'translateX(5px)'
                  }
                }
              }}>
                <Typography variant="body1">
                  <strong>Extraversion:</strong> {profile.Extraversion}
                </Typography>
                <Typography variant="body1">
                  <strong>Openness:</strong> {profile.Openness}
                </Typography>
                <Typography variant="body1">
                  <strong>Conscientiousness:</strong> {profile.Conscientiousness}
                </Typography>
                <Typography variant="body1">
                  <strong>Emotional Stability:</strong> {profile.EmotionalStability}
                </Typography>
                <Typography variant="body1">
                  <strong>Agreeableness:</strong> {profile.Agreeableness}
                </Typography>
              </Box>

              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  mt: 3, 
                  bgcolor: 'primary.light',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <Typography variant="body1">
                  {profile.Description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Navigation and Response Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 4,
            gap: 2
          }}>
            <IconButton 
              onClick={handlePrevious}
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<CheckCircleIcon />}
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'success.dark' },
                  minWidth: 100
                }}
                onClick={() => handleResponse('yes')}
                disabled={yesProfiles.length >= 4}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                startIcon={<HelpIcon />}
                sx={{
                  bgcolor: 'warning.main',
                  color: 'black',
                  '&:hover': { bgcolor: 'warning.dark' },
                  minWidth: 100
                }}
                onClick={() => handleResponse('maybe')}
              >
                Maybe
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                sx={{
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.dark' },
                  minWidth: 100
                }}
                onClick={() => handleResponse('no')}
              >
                No
              </Button>
            </Box>

            <IconButton 
              onClick={handleNext}
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          {/* Final Selection Button */}
          {yesProfiles.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AssignmentTurnedInIcon />}
                onClick={() => navigate('/final-selection')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Go to Final Selection ({yesProfiles.length} Yes, {maybeProfiles.length} Maybe)
              </Button>
            </Box>
          )}

          {/* Submit Button */}
          {yesProfiles.length === 4 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSubmit}
                sx={{
                  px: 4,
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
                Submit Selection
              </Button>
            </Box>
          )}

          {/* Display User Responses */}
          <Box sx={{ 
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: 'rgba(0,0,0,0.02)'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Your Selections:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Yes: ${yesProfiles.join(', ')}`}
                color="success"
                sx={{ m: 0.5 }}
              />
              <Chip 
                label={`Maybe: ${maybeProfiles.join(', ')}`}
                color="warning"
                sx={{ m: 0.5 }}
              />
              <Chip 
                label={`No: ${noProfiles.join(', ')}`}
                color="error"
                sx={{ m: 0.5 }}
              />
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default ProfileViewer;