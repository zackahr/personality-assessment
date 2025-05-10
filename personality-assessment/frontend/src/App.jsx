import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
import theme from './theme';
import Layout from './Layout';

// Lazy load page components
const LandingPage = lazy(() => import('./LandingPage'));
const PersonalityTest = lazy(() => import('./PersonalityTest'));
const ProfileViewer = lazy(() => import('./ProfileViewer'));
const WhyPage = lazy(() => import('./WhyPage'));
const TaskDescription = lazy(() => import('./TaskDescription'));
const DebriefingPage = lazy(() => import('./DebriefingPage'));
const HowToEvaluatePage = lazy(() => import('./HowToEvaluatePage'));

// A simple loader component to use with Suspense
const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px - 48px)', width: '100%' }}> {/* Adjust height based on AppBar and Toolbar/Padding */}
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* All routes now use the main Layout */}
            <Route path='/' element={<Layout />}>
              {/* Default route for Layout is now LandingPage */}
              <Route index element={<LandingPage />} /> 

              <Route path='personality-test' element={<PersonalityTest />} />
              <Route path='task-description' element={<TaskDescription />} />
              <Route path='how-to-evaluate' element={<HowToEvaluatePage />} />
              <Route path='profile/:id' element={<ProfileViewer />} />
              <Route path='why' element={<WhyPage />} />
              <Route path='debriefing' element={<DebriefingPage />} />
              {/* <Route path=\"demographics\" element={<DemographicsPage />} /> */}
              
              <Route path='*' element={<Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>404 - Page Not Found</Typography>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;