import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Grid,
  Alert,
  Fade,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FinalSelection = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({ yes_profiles: [], maybe_profiles: [] });
  const [finalSelections, setFinalSelections] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user's previous selections and profiles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profiles
        const profilesResponse = await fetch('http://localhost:8000/api/profiles/');
        const profilesData = await profilesResponse.json();
        setProfiles(profilesData);

        // Fetch user selections (you might want to add actual user ID)
        const selectionsResponse = await fetch('http://localhost:8000/api/get-selections/?userId=temp');
        const selectionsData = await selectionsResponse.json();
        if (selectionsData.status === 'success') {
          setSelections(selectionsData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load selections');
      }
    };

    fetchData();
  }, []);

  const handleProfileSelect = (profileId) => {
    if (finalSelections.includes(profileId)) {
      setFinalSelections(prev => prev.filter(id => id !== profileId));
    } else if (finalSelections.length < 4) {
      setFinalSelections(prev => [...prev, profileId]);
    } else {
      setError('You can only select 4 profiles');
    }
  };

  const handleSubmit = async () => {
    if (finalSelections.length !== 4) {
      setError('Please select exactly 4 profiles');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/final-selection/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'temp',
          finalProfiles: finalSelections,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setSuccess('Your final selection has been saved!');
        // Save to localStorage and navigate to why page
        localStorage.setItem('yesProfiles', JSON.stringify(finalSelections));
        navigate('/why', { 
          state: { selectedProfiles: finalSelections }
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error submitting final selection:', error);
      setError('Failed to submit selection');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
            Final Selection
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your "Yes" Profiles ({selections.yes_profiles.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {selections.yes_profiles.map((profileId) => (
                <Chip
                  key={profileId}
                  label={`Profile ${profileId}`}
                  onClick={() => handleProfileSelect(profileId)}
                  color={finalSelections.includes(profileId) ? "success" : "default"}
                  icon={finalSelections.includes(profileId) ? <CheckCircleIcon /> : null}
                  sx={{
                    fontSize: '1.1rem',
                    py: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your "Maybe" Profiles ({selections.maybe_profiles.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {selections.maybe_profiles.map((profileId) => (
                <Chip
                  key={profileId}
                  label={`Profile ${profileId}`}
                  onClick={() => handleProfileSelect(profileId)}
                  color={finalSelections.includes(profileId) ? "success" : "default"}
                  icon={finalSelections.includes(profileId) ? <CheckCircleIcon /> : null}
                  sx={{
                    fontSize: '1.1rem',
                    py: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Final Selection ({finalSelections.length}/4)
            </Typography>
            <Grid container spacing={2}>
              {finalSelections.map((profileId) => (
                <Grid item xs={12} sm={6} md={3} key={profileId}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      bgcolor: 'success.light',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6">Profile {profileId}</Typography>
                    {profiles[profileId] && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {profiles[profileId].Description.substring(0, 100)}...
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={finalSelections.length !== 4}
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
              Submit Final Selection
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Please select exactly 4 profiles from your "Yes" and "Maybe" selections.
              Your choices will be final once submitted.
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default FinalSelection; 