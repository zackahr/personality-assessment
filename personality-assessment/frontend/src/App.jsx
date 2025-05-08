import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalityTest from './PersonalityTest';
import ProfileViewer from './ProfileViewer';
import WhyPage from './WhyPage';
import FinalSelection from './FinalSelection';
import LandingPage from './LandingPage';
import TaskDescription from './TaskDescription';
import DebriefingPage from './DebriefingPage';
import HowToEvaluatePage from './HowToEvaluatePage';
// import DemographicsPage from './DemographicsPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/personality-test" element={<PersonalityTest />} />
          <Route path="/task-description" element={<TaskDescription />} />
          <Route path="/how-to-evaluate" element={<HowToEvaluatePage />} />
          <Route path="/profile/:id" element={<ProfileViewer />} />
          <Route path="/final-selection" element={<FinalSelection />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/debriefing" element={<DebriefingPage />} />
          {/* <Route path="/demographics" element={<DemographicsPage />} /> */}
        </Routes>
    </Router>
  );
}

export default App;