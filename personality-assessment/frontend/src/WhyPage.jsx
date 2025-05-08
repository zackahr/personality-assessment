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

const API_BASE_URL = "/api";

const WhyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const yesProfiles = JSON.parse(localStorage.getItem('yesProfiles')) || [];
  const { selectedProfiles } = location.state || { selectedProfiles: [] };

  const [qualitiesAnswer, setQualitiesAnswer] = useState('');
  const [personalityAnswer, setPersonalityAnswer] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');

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
        setError('Could not load profile details. Please proceed with the questions.')
        setLoading(false);
      }
    };

    fetchProfiles();
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
  
      if (!Array.isArray(yesProfiles) || yesProfiles.length !== 4) {
        setError('An issue occurred retrieving your final selections. Please ensure exactly 4 profiles were selected.');
        console.error('Incorrect number of profiles selected.', yesProfiles);
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
      const totalProfiles = Object.keys(profiles).length > 0 ? Object.keys(profiles).length : 20;

      for (let i = 1; i <= totalProfiles; i++) {
        const profileKey = `profile${i}_decision`;
        const decision = localStorage.getItem(profileKey);
        allProfileDecisions[profileKey] = decision || "not_viewed";
      }

      const storedYesProfiles = JSON.parse(localStorage.getItem('yesProfiles')) || [];
      storedYesProfiles.forEach(profileId => {
        allProfileDecisions[`profile${profileId}_decision`] = "yes";
      });
      const storedMaybeProfiles = JSON.parse(localStorage.getItem('maybeProfiles')) || [];
      storedMaybeProfiles.forEach(profileId => {
        allProfileDecisions[`profile${profileId}_decision`] = "maybe";
      });
      const storedNoProfiles = JSON.parse(localStorage.getItem('noProfiles')) || [];
       storedNoProfiles.forEach(profileId => {
         allProfileDecisions[`profile${profileId}_decision`] = "no";
       });

      const finalSelections = {};
      yesProfiles.forEach((profileId, index) => {
        if (index < 4) {
          finalSelections[`final_profile_${index + 1}`] = profileId;
        }
      });
  
      const payload = {
        prolific_id: prolificId,
        participant_id: Date.now().toString(),
        start_time: localStorage.getItem('startTime') || new Date().toISOString(),
        task_condition: taskCondition,
        ...formattedPersonalityResponses,
        ...allProfileDecisions,
        ...finalSelections,
        open_ended_q1: qualitiesAnswer.trim(),
        open_ended_q2: personalityAnswer.trim(),
        age: parseInt(age.trim()),
        gender: gender,
        education_level: education,
        end_time: new Date().toISOString(),
      };
  
      console.log('Payload:', payload);
  
      const response = await fetch(`${API_BASE_URL}/save-response/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Response saved with ID:', result.id);
  
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('profile') || key === 'personalityTestResponses' || key === 'yesProfiles' || key === 'maybeProfiles' || key === 'noProfiles' || key === 'startTime' || key === 'prolificId' || key === 'taskCondition') {
            localStorage.removeItem(key);
          }
        });
        
        navigate('/debriefing');
      } else {
        const errorData = await response.json();
        setError('Failed to save response. Please try again.');
        console.error('Failed to save response:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while submitting. Please try again.');
    }
  };

  if (loading && Object.keys(profiles).length === 0) {
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
          Reflection & Demographics
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {yesProfiles && yesProfiles.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Final Team Selection:
            </Typography>
            <Grid container spacing={3}>
              {yesProfiles.map((profileId) => (
                <Grid item xs={12} md={6} key={profileId}>
                  <Card elevation={1} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Profile {profileId}
                      </Typography>
                      {profiles[profileId] ? (
                        <>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {profiles[profileId].Description}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2" component="div">
                             <strong>Traits:</strong>
                             <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                               <li><strong>Extraversion:</strong> {profiles[profileId].Extraversion}</li>
                               <li><strong>Openness:</strong> {profiles[profileId].Openness}</li>
                               <li><strong>Conscientiousness:</strong> {profiles[profileId].Conscientiousness}</li>
                               <li><strong>Emotional Stability:</strong> {profiles[profileId].EmotionalStability}</li>
                               <li><strong>Agreeableness:</strong> {profiles[profileId].Agreeableness}</li>
                             </ul>
                          </Typography>
                        </>
                      ) : (
                         <Typography variant="body2">Loading profile details...</Typography>
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
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Reflection Question 1:
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
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
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper'
              }
            }}
          />

          <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Reflection Question 2:
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
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
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper'
              }
            }}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
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
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Gender</FormLabel>
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
            disabled={loading}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Final Answers'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WhyPage;