import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';

const API_BASE_URL = "/api";

const WhyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProfiles } = location.state || { selectedProfiles: [] };

  const [qualitiesAnswer, setQualitiesAnswer] = useState('');
  const [personalityAnswer, setPersonalityAnswer] = useState('');
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleSubmit = async () => {
    if (!qualitiesAnswer.trim() || !personalityAnswer.trim()) {
      setError('Please answer both questions before submitting');
      return;
    }

    try {
      // Retrieve values from localStorage
      const personalityTestResponses = JSON.parse(localStorage.getItem('personalityTestResponses')) || {};
      const yesProfiles = JSON.parse(localStorage.getItem('yesProfiles')) || [];
  
      // Ensure selectedProfiles is an array
      if (!Array.isArray(yesProfiles) || yesProfiles.length === 0) {
        console.error('No profiles selected.');
        return;
      }
  
      // Ensure personalityTestResponses has expected structure
      if (Object.keys(personalityTestResponses).length === 0) {
        console.error('Personality test responses are missing.');
        return;
      }

      // Format personality test responses
      const formattedPersonalityResponses = {};
      Object.entries(personalityTestResponses).forEach(([key, value]) => {
        const questionNumber = key.replace('q', '');
        formattedPersonalityResponses[`personality_q${questionNumber}`] = parseInt(value);
      });

      // Get all profile decisions from localStorage
      const allProfileDecisions = {};
      for (let i = 1; i <= 19; i++) {
        // Default to "no" if not found
        allProfileDecisions[`profile${i}_decision`] = "no";
      }

      // Update with actual decisions
      yesProfiles.forEach(profileId => {
        allProfileDecisions[`profile${profileId}_decision`] = "yes";
      });

      // Get maybe profiles from localStorage if available
      const maybeProfiles = JSON.parse(localStorage.getItem('maybeProfiles')) || [];
      maybeProfiles.forEach(profileId => {
        allProfileDecisions[`profile${profileId}_decision`] = "maybe";
      });

      // Format final selections
      const finalSelections = {};
      yesProfiles.forEach((profileId, index) => {
        if (index < 4) {
          finalSelections[`final_profile_${index + 1}`] = profileId;
        }
      });
  
      // Prepare the payload according to the schema
      const payload = {
        participant_id: Date.now().toString(), // Generate a unique ID
        start_time: localStorage.getItem('startTime') || new Date().toISOString(),
        end_time: new Date().toISOString(),
        ...formattedPersonalityResponses,
        ...allProfileDecisions,
        ...finalSelections,
        open_ended_q1: qualitiesAnswer.trim(),
        open_ended_q2: personalityAnswer.trim()
      };
  
      console.log('Payload:', payload);
  
      // Send request
      const response = await fetch(`${API_BASE_URL}/save-response/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Response saved with ID:', result.id);
  
        // Clear all localStorage items
        localStorage.removeItem('personalityTestResponses');
        localStorage.removeItem('yesProfiles');
        localStorage.removeItem('maybeProfiles');
        localStorage.removeItem('startTime');
        
        navigate('/');
      } else {
        const errorData = await response.json();
        setError('Failed to save response. Please try again.');
        console.error('Failed to save response:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main', textAlign: 'center' }}>
          Final Questions
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your Selected Profiles:
          </Typography>
          <Grid container spacing={3}>
            {selectedProfiles.map((profileId) => (
              <Grid item xs={12} md={6} key={profileId}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Profile {profileId}
                    </Typography>
                    {profiles[profileId] && (
                      <>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {profiles[profileId].Description}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2">
                          <strong>Extraversion:</strong> {profiles[profileId].Extraversion}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Openness:</strong> {profiles[profileId].Openness}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Conscientiousness:</strong> {profiles[profileId].Conscientiousness}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Emotional Stability:</strong> {profiles[profileId].EmotionalStability}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Agreeableness:</strong> {profiles[profileId].Agreeableness}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Question 1:
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            What qualities did you focus on when choosing your team members?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Consider the personality traits, characteristics, and qualities that influenced your choices..."
            value={qualitiesAnswer}
            onChange={(e) => setQualitiesAnswer(e.target.value)}
            sx={{ 
              mb: 4,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper'
              }
            }}
          />

          <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Question 2:
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            How do you think your own personality influenced your selection decisions?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Reflect on how your own personality traits and preferences may have affected your choices..."
            value={personalityAnswer}
            onChange={(e) => setPersonalityAnswer(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper'
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            size="large"
            disabled={!qualitiesAnswer.trim() || !personalityAnswer.trim()}
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
            Submit Answers
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WhyPage;