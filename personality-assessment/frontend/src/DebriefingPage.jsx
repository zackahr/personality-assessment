import React from 'react';
import { Container, Typography, Paper, Box, Link, Divider } from '@mui/material';
import { useStepGuard, getStepFromPath } from './hooks/useStepGuard';

const DebriefingPage = () => {
  // Current step for the guard
  useStepGuard(6);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main', textAlign: 'center' }}>
          Thank You for Participating!
        </Typography>

        <Typography variant="body1" paragraph>
          Now that you've completed the study, here's more information about its purpose and context.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Purpose
          </Typography>
          <Typography variant="body1" paragraph>
            This study explores how personality traits influence decisions about group formation. We are especially interested in whether individuals tend to choose:
          </Typography>
          <ul style={{ marginTop: 0, paddingLeft: '20px' }}>
            <li>People with similar traits (homophily),</li>
            <li>People with complementary traits, or</li>
            <li>Other emergent selection patterns.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Background
          </Typography>
          <Typography variant="body1" paragraph>
            There are competing theories in team composition research:
          </Typography>
          <ul style={{ marginTop: 0, paddingLeft: '20px' }}>
            <li>Homophily promotes cohesion and reduces conflict (Selfhout et al., 2010).</li>
            <li>Complementarity may enhance collaboration through diverse perspectives (Winsborough & Chamorro-Premuzic, 2017).</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Why Your Data Matters
          </Typography>
          <Typography variant="body1" paragraph>
            Your responses help us understand how personality influences team-building preferences, which can inform educational and organizational practices.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Next Steps
          </Typography>
          <Typography variant="body1" paragraph>
            This is part of a larger research program. Future phases will examine how different personality compositions impact group performance.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Further Reading
          </Typography>
          <Typography variant="body2" component="div" sx={{ lineHeight: 1.6 }}>
            <ul style={{ marginTop: 0, paddingLeft: '20px' }}>
              <li>
                McCrae, R. R., & Costa, P. T. (1997). Personality trait structure as a human universal. 
                <Link href="https://doi.org/10.1037/0003-066X.52.5.509" target="_blank" rel="noopener"> American Psychologist, 52(5), 509–516.</Link>
              </li>
              <li>
                Barrick, M. R., Stewart, G. L., Neubert, M. J., & Mount, M. K. (1998). Relating member ability and personality to work-team processes and team effectiveness. 
                <Link href="https://doi.org/10.1037/0021-9010.83.3.377" target="_blank" rel="noopener"> Journal of Applied Psychology, 83(3), 377–391.</Link>
              </li>
            </ul>
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
            Contact
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions or would like to receive study results, please reach out via Prolific messaging.
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center'  }}>
          You can leave this survey by closing this page.      
        </Typography>

      </Paper>
    </Container>
  );
};

export default DebriefingPage; 