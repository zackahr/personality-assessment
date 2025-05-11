import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Paper,
  FormHelperText,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Stack,
} from '@mui/material';
import { Science, CheckCircle } from '@mui/icons-material';
import { useStepGuard, completeStep, getStepFromPath } from './hooks/useStepGuard';

const API_BASE_URL = "/api";

const questions = [
  "Extraverted, enthusiastic",
  "Critical, quarrelsome",
  "Dependable, self-disciplined",
  "Anxious, easily upset",
  "Open to new experiences, complex",
  "Reserved, quiet",
  "Sympathetic, warm",
  "Disorganized, careless",
  "Calm, emotionally stable",
  "Conventional, uncreative"
];

const ratingScale = [
  { value: 1, label: "Disagree strongly" },
  { value: 2, label: "Disagree moderately" },
  { value: 3, label: "Disagree a little" },
  { value: 4, label: "Neither agree nor disagree" },
  { value: 5, label: "Agree a little" },
  { value: 6, label: "Agree moderately" },
  { value: 7, label: "Agree strongly" },
];

const RatingInput = ({ value, onChange, error }) => {
  const theme = useTheme();
  
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <Slider
          value={value ? parseInt(value) : 4}
          onChange={(_, newValue) => onChange(newValue.toString())}
          step={1}
          marks={ratingScale.map(scale => ({
            value: scale.value,
            label: scale.value.toString()
          }))}
          min={1}
          max={7}
          sx={{
            '& .MuiSlider-mark': {
              height: 10,
            },
            '& .MuiSlider-thumb': {
              height: 28,
              width: 28,
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
              },
            },
            '& .MuiSlider-valueLabel': {
              lineHeight: 1.2,
              fontSize: 12,
              background: 'unset',
              padding: 0,
              width: 32,
              height: 32,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: theme.palette.primary.main,
              transformOrigin: 'bottom left',
              transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
              '&:before': { display: 'none' },
              '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
              },
              '& > *': {
                transform: 'rotate(45deg)',
              },
            },
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 1,
          px: 1,
          '& > span': {
            fontSize: '0.75rem',
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: '80px'
          }
        }}>
          <span>Disagree strongly</span>
          <span>Agree strongly</span>
        </Box>
      </Box>
  );
};

export default function PersonalityTest() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Current step for the guard
  useStepGuard(1);

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: questions.reduce((acc, _, index) => {
      acc[`q${index + 1}`] = "";
      return acc;
    }, {})
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      localStorage.setItem('personalityTestResponses', JSON.stringify(data));
      console.log('Responses saved:', data);

      await fetch(`${API_BASE_URL}/selections/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'temp',
          yesProfiles: [],
          maybeProfiles: [],
        }),
      });

      completeStep(1); // Mark step 1 as complete
      navigate('/task-description');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Science sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Personality Assessment
          </Typography>
        </Box>

        <Typography variant="subtitle1" paragraph sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Please rate each statement from 1 (Disagree strongly) to 7 (Agree strongly)
        </Typography>

        {/* Rating scale legend */}
        <Card sx={{ mb: 4, width: '100%', backgroundColor: 'background.paper' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Rating Scale:
            </Typography>
            <Grid container spacing={2}>
              {ratingScale.map((scale) => (
                <Grid key={scale.value} item xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {scale.value}
                    </Box>
                    <Typography variant="body2">{scale.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <Stack spacing={3}>
            {questions.map((question, index) => (
              <Card 
                key={index} 
                sx={{ 
                  p: 2,
                  border: errors[`q${index + 1}`] ? `1px solid ${theme.palette.error.main}` : 'none'
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {index + 1}. {question}
                  </Typography>
                  <Controller
                    name={`q${index + 1}`}
                    control={control}
                    rules={{ required: 'This question is required' }}
                    render={({ field }) => (
                      <RatingInput
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors[`q${index + 1}`]}
                      />
                    )}
                  />
                  {errors[`q${index + 1}`] && (
                    <FormHelperText sx={{ color: 'error.main', mt: 1 }}>
                      {errors[`q${index + 1}`].message}
                    </FormHelperText>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CheckCircle />}
              sx={{ 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                px: 4,
                py: 1.5,
                minWidth: isMobile ? '100%' : 'auto'
              }}
            >
              Submit Assessment
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
