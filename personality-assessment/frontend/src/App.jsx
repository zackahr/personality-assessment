import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalityTest from './PersonalityTest';
import ProfileViewer from './ProfileViewer';
import WhyPage from './WhyPage';
import FinalSelection from './FinalSelection';
import LandingPage from './LandingPage';
import TaskDescription from './TaskDescription';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/personality-test" element={<PersonalityTest />} />
          <Route path="/task-description" element={<TaskDescription />} />
          <Route path="/profile/:id" element={<ProfileViewer />} />
          <Route path="/final-selection" element={<FinalSelection />} />
          <Route path="/why" element={<WhyPage />} />
        </Routes>
    </Router>
  );
}

export default App;