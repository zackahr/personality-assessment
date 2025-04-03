import { useForm, Controller } from 'react-hook-form'; // Import Controller
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Paper,
  FormHelperText,
  Grid
} from '@mui/material';
import { Science, CheckCircle } from '@mui/icons-material';

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

export default function PersonalityTest() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: questions.reduce((acc, _, index) => {
      acc[`q${index + 1}`] = ""; // Initialize each question with an empty value
      return acc;
    }, {})
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      // Save the form data to localStorage
      localStorage.setItem('personalityTestResponses', JSON.stringify(data));
      console.log('Responses saved to localStorage:', data);

      // Initialize selections in the backend
      await fetch('http://localhost:8000/api/selections/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'temp',
          yesProfiles: [],
          maybeProfiles: [],
        }),
      });

      // Navigate to profile selection
      navigate('/profile/1');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Science sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Personality Assessment
          </Typography>
        </Box>
        <Typography variant="subtitle1" paragraph sx={{ color: 'text.secondary' }}>
          Please rate each statement from 1 (Disagree strongly) to 7 (Agree strongly)
        </Typography>

        {/* Legend for the rating scale */}
        <Box sx={{ mb: 4, p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Rating Scale:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">1 = Disagree strongly</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">2 = Disagree moderately</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">3 = Disagree a little</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">4 = Neither agree nor disagree</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">5 = Agree a little</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">6 = Agree moderately</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2">7 = Agree strongly</Typography>
            </Grid>
          </Grid>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "left", fontWeight: "bold", fontSize: '1.1rem' }}>Question</TableCell>
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <TableCell key={num} sx={{ textAlign: "center", fontWeight: "bold", fontSize: '1.1rem' }}>
                    {num}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                  <TableCell sx={{ textAlign: "left", fontSize: '1rem' }}>
                    {index + 1}. {question}
                  </TableCell>
                  <TableCell colSpan={7} sx={{ padding: "6px" }}>
                    <Controller
                      name={`q${index + 1}`} // Unique name for each question
                      control={control}
                      rules={{ required: "This question is required" }} // Validation rule
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          aria-label={`question-${index}`}
                          value={field.value || ""} // Ensure controlled value
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map(value => (
                            <FormControlLabel
                              key={value}
                              value={value.toString()}
                              control={<Radio size="small" color="primary" />}
                              labelPlacement="bottom"
                              sx={{ margin: 0, flex: 1 }}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors[`q${index + 1}`] && (
                      <FormHelperText sx={{ color: 'error.main', textAlign: 'center' }}>
                        {errors[`q${index + 1}`].message}
                      </FormHelperText>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<CheckCircle />}
              disabled={Object.keys(errors).length > 0}
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Submit Assessment
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}