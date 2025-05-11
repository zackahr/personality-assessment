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
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { useStepGuard, completeStep, getStepFromPath } from './hooks/useStepGuard';

const API_BASE_URL = "/api";

const WhyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Current step for the guard
  useStepGuard(5);

  // Ensure yesProfiles is an array, even if localStorage is null or malformed
  let yesProfiles = [];
  try {
    const storedYesProfiles = localStorage.getItem('yesProfiles');
    if (storedYesProfiles) {
      yesProfiles = JSON.parse(storedYesProfiles);
      if (!Array.isArray(yesProfiles)) {
        yesProfiles = []; // Default to empty array if not an array
      }
    }
  } catch (e) {
    console.error("Error parsing yesProfiles from localStorage", e);
    yesProfiles = []; // Default to empty array on error
  }
  
  const { selectedProfiles } = location.state || { selectedProfiles: yesProfiles }; // Use parsed yesProfiles as fallback

  const [qualitiesAnswer, setQualitiesAnswer] = useState('');
  const [personalityAnswer, setPersonalityAnswer] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');

  const [allProfilesData, setAllProfilesData] = useState({}); // Stores the actual profile objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfilesData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profiles/`);
        const data = await response.json();
        if (data && data.profiles) { // Check if data.profiles exists
          setAllProfilesData(data.profiles); // Store only the profiles object
        } else {
          console.error('Fetched data does not contain profiles:', data);
          setError('Profile data is not in the expected format.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError('Could not load profile details. Please proceed with the questions.');
        setLoading(false);
      }
    };

    fetchProfilesData();
  }, []);

  const handleSubmit = async () => {
    if (!qualitiesAnswer.trim() || !personalityAnswer.trim() || !age.trim() || !gender || !education) {
      setError('Please answer all questions, including demographics, before submitting');
      return;
    }
    if (isNaN(parseInt(age.trim())) || parseInt(age.trim()) <= 0) {
      setError('Please enter a valid age.');
      return;
    }

    setError('');

    try {
      const personalityTestResponses = JSON.parse(localStorage.getItem('personalityTestResponses')) || {};
      const prolificId = localStorage.getItem('prolificId') || 'NOT_PROVIDED';
      const taskCondition = localStorage.getItem('taskCondition') || 'NOT_ASSIGNED';
  
      if (!Array.isArray(selectedProfiles) || selectedProfiles.length === 0) { // Check selectedProfiles from location state
        setError('An issue occurred retrieving your final selections. Please ensure profiles were selected.');
        console.error('No profiles selected or issue with selectedProfiles from location.state.', selectedProfiles);
        return;
      }
      if (Object.keys(personalityTestResponses).length === 0) {
        setError('An issue occurred retrieving your personality responses.');
        console.error('Personality test responses are missing.');
        return;
      }

      const formattedPersonalityResponses = {};
      Object.entries(personalityTestResponses).forEach(([key, value]) => {
        const questionNumber = key.replace('q', '');
        formattedPersonalityResponses[`personality_q${questionNumber}`] = parseInt(value);
      });

      const allProfileDecisions = {};
      // Use the keys from the fetched allProfilesData to determine the number of profiles
      const totalProfileCount = Object.keys(allProfilesData).length > 0 ? Object.keys(allProfilesData).length : 19; // Default to 19 if fetch failed early

      for (let i = 1; i <= totalProfileCount; i++) {
        // Note: This assumes profile IDs in localStorage decisions are 1-based and map to actual profile IDs
        // If urlMapping was used for decisions, this logic might need adjustment
        const profileKey = `profile${i}_decision`;
        const decision = localStorage.getItem(profileKey);
        allProfileDecisions[profileKey] = decision || "not_viewed";
      }

      // Override with actual selections from the user journey
      const finalSelectedProfileIds = selectedProfiles;
      finalSelectedProfileIds.forEach(profileId => {
        allProfileDecisions[`profile${profileId}_decision`] = "yes"; // Assuming these were the final YES
      });
      // If you also have maybe/no from the previous step and want to record them, retrieve them here.
      // For simplicity, this example only focuses on the final YES selections for the payload.

      const finalSelectionsForPayload = {};
      finalSelectedProfileIds.slice(0, 4).forEach((profileId, index) => { // Ensure only up to 4
        finalSelectionsForPayload[`final_profile_${index + 1}`] = profileId;
      });
  
      const payload = {
        prolific_id: prolificId,
        participant_id: Date.now().toString(),
        start_time: localStorage.getItem('startTime') || new Date().toISOString(),
        task_condition: taskCondition,
        ...formattedPersonalityResponses,
        ...allProfileDecisions,
        ...finalSelectionsForPayload,
        open_ended_q1: qualitiesAnswer.trim(),
        open_ended_q2: personalityAnswer.trim(),
        age: parseInt(age.trim()),
        gender: gender,
        education_level: education,
        end_time: new Date().toISOString(),
      };
  
      console.log('Payload being sent to /save-response/:', payload);
  
      const response = await fetch(`${API_BASE_URL}/save-response/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Response saved successfully. Participant ID:', result.participant_id);
  
        // Clear relevant localStorage items
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('profile') || key === 'personalityTestResponses' || key === 'yesProfiles' || key === 'maybeProfiles' || key === 'noProfiles' || key === 'startTime' || key === 'prolificId' || key === 'taskCondition' || key === 'userProgress') {
            localStorage.removeItem(key);
          }
        });
        
        completeStep(5); // Mark step 5 as complete
        navigate('/debriefing');
      } else {
        const errorData = await response.json();
        setError(`Failed to save response: ${errorData.message || 'Unknown error'}`);
        console.error('Failed to save response:', errorData);
      }
    } catch (e) {
      console.error('Error in handleSubmit:', e);
      setError(`An error occurred while submitting: ${e.message}`);
    }
  };

  if (loading && Object.keys(allProfilesData).length === 0) { // Check allProfilesData now
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: {xs: 2, md: 4}, borderRadius: theme => theme.shape.borderRadius, border: theme => `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main', textAlign: 'center' }}>
          Reflection & Demographics
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {selectedProfiles && selectedProfiles.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
              Your Final Team Selection:
            </Typography>
            <Grid container spacing={3}>
              {selectedProfiles.map((profileId) => (
                <Grid item xs={12} md={6} key={profileId}>
                  <Card elevation={0} sx={{ height: '100%', border: theme => `1px solid ${theme.palette.divider}` }}> {/* Use theme border */}
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Profile {profileId}
                      </Typography>
                      {allProfilesData[profileId] ? ( // Check allProfilesData here
                        <>
                          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {allProfilesData[profileId].Description}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                             <strong>Traits:</strong>
                             <ul style={{ marginTop: '4px', paddingLeft: '20px', listStylePosition: 'inside' }}>
                               <li><strong>Extraversion:</strong> {allProfilesData[profileId].Extraversion}</li>
                               <li><strong>Openness:</strong> {allProfilesData[profileId].Openness}</li>
                               <li><strong>Conscientiousness:</strong> {allProfilesData[profileId].Conscientiousness}</li>
                               <li><strong>Emotional Stability:</strong> {allProfilesData[profileId].EmotionalStability}</li>
                               <li><strong>Agreeableness:</strong> {allProfilesData[profileId].Agreeableness}</li>
                             </ul>
                          </Typography>
                        </>
                      ) : (
                         <Typography variant="body2" sx={{color: 'text.secondary'}}>Loading profile details for ID {profileId}...</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 4 }} />
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Reflection Question 1:
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
            What qualities did you focus on when choosing your team members?
          </Typography>
          <TextField
            fullWidth
            multiline
            required
            rows={4}
            variant="outlined"
            placeholder="Consider the personality traits, characteristics, and qualities that influenced your choices..."
            value={qualitiesAnswer}
            onChange={(e) => setQualitiesAnswer(e.target.value)}
            sx={{ 
              mb: 4,
                backgroundColor: 'background.paper'
            }}
          />

          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Reflection Question 2:
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
            How do you think your own personality influenced your selection decisions?
          </Typography>
          <TextField
            fullWidth
            multiline
            required
            rows={4}
            variant="outlined"
            placeholder="Reflect on how your own personality traits and preferences may have affected your choices..."
            value={personalityAnswer}
            onChange={(e) => setPersonalityAnswer(e.target.value)}
            sx={{ 
              mb: 4,
                backgroundColor: 'background.paper'
            }}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'primary.dark' }}>
            Demographic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Age"
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <FormControl component="fieldset" required sx={{ mt: { xs: 2, sm: 0 } }}>
                <FormLabel component="legend" sx={{color: 'text.primary', mb: 0.5}}>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="prefer_not_to_say" control={<Radio />} label="Prefer not to say" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="education-level-label">Educational Level</InputLabel>
                <Select
                  labelId="education-level-label"
                  id="education-level-select"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  label="Educational Level"
                >
                  <MenuItem value=""><em>Select...</em></MenuItem>
                  <MenuItem value="high_school">High School Diploma or Equivalent</MenuItem>
                  <MenuItem value="some_college">Some College, No Degree</MenuItem>
                  <MenuItem value="associates">Associate's Degree</MenuItem>
                  <MenuItem value="bachelors">Bachelor's Degree</MenuItem>
                  <MenuItem value="masters">Master's Degree</MenuItem>
                  <MenuItem value="doctorate">Doctoral Degree (PhD, EdD, etc.)</MenuItem>
                  <MenuItem value="professional">Professional Degree (MD, JD, etc.)</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleSubmit}
            disabled={loading} // Keep disabled while any async operation (like fetching profiles initially) might be in progress
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Final Answers'} {/* color inherit for button text color */}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WhyPage;