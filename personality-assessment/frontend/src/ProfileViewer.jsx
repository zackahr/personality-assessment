import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box, Grid, Fade, Chip, LinearProgress, IconButton, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';

const API_BASE_URL = "/api";

const TraitCard = ({ trait, value, color }) => {
  const theme = useTheme();
  
  // Calculate if this is the Extraversion trait
  const isExtraversion = trait === 'Extraversion';
  
  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 0.5, sm: 1 },
        borderRadius: { xs: 1, sm: 1.5 },
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        justifyContent: { xs: 'space-between', sm: 'center' },
        background: `linear-gradient(135deg, ${color}10, ${color}15)`,
        border: `1px solid ${color}20`,
        transition: 'all 0.3s ease',
        flex: 1,
        minWidth: { xs: '100%', sm: 0 },
        height: { xs: isExtraversion ? '40px' : '32px', sm: 'auto' },
        transform: isExtraversion ? 'scale(1.05)' : 'none',
        zIndex: isExtraversion ? 1 : 0,
        boxShadow: isExtraversion ? `0 2px 8px ${color}30` : 'none',
        '&:hover': {
          transform: `translateY(-1px) ${isExtraversion ? 'scale(1.05)' : 'none'}`,
          boxShadow: `0 2px 8px ${color}20`,
        },
      }}
    >
      <Typography
        variant="subtitle2"
        component="h3"
        sx={{
          fontWeight: 'bold',
          color: 'text.secondary',
          textAlign: { xs: 'left', sm: 'center' },
          mb: { xs: 0, sm: 0.5 },
          fontSize: { xs: isExtraversion ? '0.8rem' : '0.7rem', sm: isExtraversion ? '0.9rem' : '0.8rem' }
        }}
      >
        {trait}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: color,
          textAlign: 'center',
          fontSize: { xs: isExtraversion ? '0.9rem' : '0.8rem', sm: isExtraversion ? '1.1rem' : '1rem' },
          ml: { xs: 1, sm: 0 }
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

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
        const response = await fetch(`${API_BASE_URL}/profiles/`);
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

    // Check if this profile is already in the selected category
    const isAlreadyInCategory = (
      (response === 'yes' && yesProfiles.includes(profileId)) ||
      (response === 'maybe' && maybeProfiles.includes(profileId)) ||
      (response === 'no' && noProfiles.includes(profileId))
    );

    // If already in the selected category, just remove it
    if (isAlreadyInCategory) {
      updatedYesProfiles = updatedYesProfiles.filter(id => id !== profileId);
      updatedMaybeProfiles = updatedMaybeProfiles.filter(id => id !== profileId);
      updatedNoProfiles = updatedNoProfiles.filter(id => id !== profileId);
    } else {
      // Remove from all categories first
      updatedYesProfiles = updatedYesProfiles.filter(id => id !== profileId);
      updatedMaybeProfiles = updatedMaybeProfiles.filter(id => id !== profileId);
      updatedNoProfiles = updatedNoProfiles.filter(id => id !== profileId);

      // Add to the new category
      if (response === 'yes' && yesProfiles.length < 4) {
        updatedYesProfiles.push(profileId);
      } else if (response === 'maybe') {
        updatedMaybeProfiles.push(profileId);
      } else if (response === 'no') {
        updatedNoProfiles.push(profileId);
      }
    }

    setYesProfiles(updatedYesProfiles);
    setMaybeProfiles(updatedMaybeProfiles);
    setNoProfiles(updatedNoProfiles);

    // Save selections to backend
    try {
      await fetch(`${API_BASE_URL}/selections/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'temp',
          yesProfiles: updatedYesProfiles,
          maybeProfiles: updatedMaybeProfiles,
        }),
      });
    } catch (error) {
      console.error('Error saving selections:', error);
    }

    // Only navigate to next if this was a new selection
    if (!isAlreadyInCategory) {
      handleNext();
    }
  };

  // Helper function to determine current selection
  const getCurrentSelection = (profileId) => {
    if (yesProfiles.includes(profileId)) return 'yes';
    if (maybeProfiles.includes(profileId)) return 'maybe';
    if (noProfiles.includes(profileId)) return 'no';
    return null;
  };

  const handleSubmit = () => {
    // Save the 4 "Yes" profiles to localStorage
    localStorage.setItem('yesProfiles', JSON.stringify(yesProfiles));
    console.log('Yes profiles saved to localStorage:', yesProfiles);

    // Navigate to the "/why" page with the selected profiles
    navigate('/why', { state: { selectedProfiles: yesProfiles } });
  };

  const getTraitColor = (trait, value) => {
    const theme = useTheme();
    switch(trait) {
      case 'Extraversion':
        return theme.palette.primary.main;
      case 'Openness':
        return theme.palette.secondary.main;
      case 'Conscientiousness':
        return theme.palette.success.main;
      case 'Emotional Stability':
        return theme.palette.info.main;
      case 'Agreeableness':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[700];
    }
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

  const totalProfiles = Object.keys(profiles).length;
  const viewedProfiles = [...new Set([...yesProfiles, ...maybeProfiles, ...noProfiles])].length;

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 1, sm: 4 },
        px: { xs: 0.5, sm: 2 },
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Fade in timeout={500}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 1, sm: 3, md: 4 }, 
            borderRadius: { xs: 1, sm: 3 },
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {/* Progress Bar-like Navigation with Numbers */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 0.5, sm: 2 }, 
            mb: { xs: 1.5, sm: 4 },
            flexWrap: 'wrap',
            maxWidth: '100%',
            px: { xs: 0.5, sm: 2 }
          }}>
            {Object.keys(profiles).map((id) => {
              const currentProfileId = parseInt(id, 10);

              let chipStyle = {
                width: { xs: 24, sm: 40 },
                height: { xs: 24, sm: 40 },
                fontSize: { xs: '0.75rem', sm: '1rem' },
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '50%',
                p: 0,
                '& .MuiChip-label': {
                  p: 0,
                  width: '100%',
                  textAlign: 'center'
                },
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

          {/* Profile Title */}
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: { xs: 1.5, sm: 4 },
              color: 'primary.main',
              textAlign: 'center',
              fontSize: { xs: '1.25rem', sm: '2.125rem' }
            }}
          >
            Profile #{profileId}
          </Typography>

          {/* Selection Counters */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'row' },
            justifyContent: 'center',
            gap: { xs: 2, sm: 4 },
            mb: { xs: 2, sm: 4 },
            px: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 1.5 },
            bgcolor: 'grey.50',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5
            }}>
              <CheckCircleIcon sx={{ 
                color: 'success.main',
                fontSize: { xs: 16, sm: 20 }
              }} />
              <Typography sx={{ 
                color: 'success.main',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                {yesProfiles.length}/4
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5
            }}>
              <HelpIcon sx={{ 
                color: 'warning.main',
                fontSize: { xs: 16, sm: 20 }
              }} />
              <Typography sx={{ 
                color: 'warning.main',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                {maybeProfiles.length}
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5
            }}>
              <CancelIcon sx={{ 
                color: 'error.main',
                fontSize: { xs: 16, sm: 20 }
              }} />
              <Typography sx={{ 
                color: 'error.main',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
                {noProfiles.length}
              </Typography>
            </Box>
          </Box>

          {/* Traits Grid */}
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(5, 1fr)' },
              gap: { xs: 1, sm: 2 },
              mb: { xs: 2, sm: 3 },
              width: '100%'
            }}
          >
            {Object.entries(profile)
              .filter(([key]) => ['Extraversion', 'Openness', 'Conscientiousness', 'EmotionalStability', 'Agreeableness'].includes(key))
              .map(([trait, value]) => (
                <TraitCard
                  key={trait}
                  trait={trait === 'EmotionalStability' ? 'Emotional Stability' : trait}
                  value={value}
                  color={getTraitColor(trait)}
                />
              ))
            }
          </Box>

          {/* Description Card */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2.5, sm: 4 },
              mb: { xs: 2, sm: 4 },
              borderRadius: { xs: 1.5, sm: 2 },
              backgroundColor: 'background.paper',
              minHeight: { xs: '200px', sm: '250px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: { xs: 1.8, sm: 2 },
                fontSize: { xs: '1.1rem', sm: '1.35rem' },
                fontWeight: 400,
                color: 'text.primary',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto',
                letterSpacing: '0.01em'
              }}
            >
              {profile.Description}
            </Typography>
          </Paper>

          {/* Navigation and Response Buttons */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: { xs: 1, sm: 3 },
            mt: { xs: 1.5, sm: 4 }
          }}>
            <IconButton 
              onClick={handlePrevious}
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 },
                '&:hover': { 
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowBackIcon sx={{ fontSize: { xs: 20, sm: 32 } }} />
            </IconButton>

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 4 },
              flex: 1,
              justifyContent: 'center'
            }}>
              <Button
                variant="contained"
                startIcon={<CheckCircleIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />}
                sx={{
                  bgcolor: getCurrentSelection(profileId) === 'yes' ? 'success.dark' : 'success.main',
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'success.dark',
                    transform: 'scale(1.05)'
                  },
                  minWidth: { xs: 80, sm: 160 },
                  height: { xs: 36, sm: 56 },
                  border: getCurrentSelection(profileId) === 'yes' ? '2px solid white' : 'none',
                  fontSize: { xs: '0.875rem', sm: '1.2rem' },
                  transition: 'all 0.2s ease',
                  px: { xs: 1, sm: 3 }
                }}
                onClick={() => handleResponse('yes')}
                disabled={yesProfiles.length >= 4 && !yesProfiles.includes(profileId)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                startIcon={<HelpIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />}
                sx={{
                  bgcolor: getCurrentSelection(profileId) === 'maybe' ? 'warning.dark' : 'warning.main',
                  color: 'black',
                  '&:hover': { 
                    bgcolor: 'warning.dark',
                    transform: 'scale(1.05)'
                  },
                  minWidth: { xs: 80, sm: 160 },
                  height: { xs: 36, sm: 56 },
                  border: getCurrentSelection(profileId) === 'maybe' ? '2px solid black' : 'none',
                  fontSize: { xs: '0.875rem', sm: '1.2rem' },
                  transition: 'all 0.2s ease',
                  px: { xs: 1, sm: 3 }
                }}
                onClick={() => handleResponse('maybe')}
              >
                Maybe
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />}
                sx={{
                  bgcolor: getCurrentSelection(profileId) === 'no' ? 'error.dark' : 'error.main',
                  color: 'white',
                  '&:hover': { 
                    bgcolor: 'error.dark',
                    transform: 'scale(1.05)'
                  },
                  minWidth: { xs: 80, sm: 160 },
                  height: { xs: 36, sm: 56 },
                  border: getCurrentSelection(profileId) === 'no' ? '2px solid white' : 'none',
                  fontSize: { xs: '0.875rem', sm: '1.2rem' },
                  transition: 'all 0.2s ease',
                  px: { xs: 1, sm: 3 }
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
                width: { xs: 36, sm: 56 },
                height: { xs: 36, sm: 56 },
                '&:hover': { 
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowForwardIcon sx={{ fontSize: { xs: 20, sm: 32 } }} />
            </IconButton>
          </Box>

          {/* Progress and Submit Section */}
          <Box sx={{ 
            position: 'sticky', 
            bottom: { xs: 8, sm: 16 }, 
            zIndex: 10,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            mt: { xs: 2, sm: 4 },
            bgcolor: 'background.paper',
            p: { xs: 1.5, sm: 3 },
            borderRadius: { xs: 1, sm: 2 },
            boxShadow: 3,
            mx: { xs: -0.5, sm: 0 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              p: { xs: 0.5, sm: 1 },
              borderRadius: 1,
              bgcolor: 'grey.50',
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <VisibilityIcon sx={{ 
                color: 'primary.main',
                fontSize: { xs: 20, sm: 28 }
              }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500,
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '0.9rem', sm: '1.25rem' }
                }}
              >
                <span style={{ color: 'primary.main', fontWeight: 'bold' }}>{viewedProfiles}</span>
                <span style={{ color: 'text.secondary' }}>/</span>
                <span>{totalProfiles}</span>
                <span style={{ fontSize: '0.8rem', color: 'text.secondary', marginLeft: '4px' }}>profiles viewed</span>
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={yesProfiles.length !== 4}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                px: { xs: 2, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                bgcolor: yesProfiles.length === 4 ? 'primary.main' : 'grey.400',
                color: yesProfiles.length === 4 ? 'white' : 'text.secondary',
                '&:hover': {
                  bgcolor: yesProfiles.length === 4 ? 'primary.dark' : 'grey.500',
                  transform: yesProfiles.length === 4 ? 'scale(1.02)' : 'none'
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.500'
                },
                transition: 'all 0.2s ease',
                boxShadow: yesProfiles.length === 4 ? 2 : 0
              }}
            >
              Submit ({yesProfiles.length}/4 selected)
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default ProfileViewer;