import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define the sequence of your application. 
// The keys are step numbers (0-indexed), and values are their paths.
export const STEP_PATHS = {
  0: '/',                   // LandingPage (Welcome)
  1: '/personality-test',
  2: '/task-description',
  3: '/how-to-evaluate',
  4: '/profile/1',          // Entry point to profile viewing. Assumes profiles are 1-indexed in URL.
                           // The ProfileViewer itself handles navigation between profiles (e.g., /profile/2, etc.)
                           // Step 4 is considered complete when all profiles are reviewed and selection is submitted from ProfileViewer.
  5: '/why',                // Reflection page
};

// Helper to get the current step number from a pathname
export const getStepFromPath = (pathname) => {
  if (pathname.startsWith('/profile/')) return 4; // All /profile/:id routes belong to step 4
  for (const step in STEP_PATHS) {
    if (STEP_PATHS[step] === pathname) {
      return parseInt(step, 10);
    }
  }
  return 0; // Default to step 0 (Landing Page) if path is not recognized
};

// Helper to get the path for a given step number
export const getPathForStep = (step) => {
  return STEP_PATHS[step] || '/'; // Default to Landing Page
};

/**
 * Custom hook to guard routes based on user progress.
 * @param {number} currentPageStep The step number associated with the current page.
 */
export const useStepGuard = (currentPageStep) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedProgress = localStorage.getItem('userProgress');
    // Initialize to -1 if no progress, meaning only step 0 is accessible initially.
    const maxCompletedStep = storedProgress ? parseInt(storedProgress, 10) : -1; 

    // If the current page's step is greater than the next allowed step, redirect.
    // Users can always revisit already completed or the current step (maxCompletedStep + 1).
    if (currentPageStep > maxCompletedStep + 1) {
      console.warn(
        `Access to step ${currentPageStep} (${location.pathname}) denied. ` +
        `Max completed step: ${maxCompletedStep}. ` +
        `Redirecting to step ${maxCompletedStep + 1}: ${getPathForStep(maxCompletedStep + 1)}`
      );
      navigate(getPathForStep(maxCompletedStep + 1), { replace: true });
    }
  }, [currentPageStep, navigate, location.pathname]);
};

/**
 * Call this function when a step is successfully completed.
 * @param {number} completedStepNumber The step number that was just completed.
 */
export const completeStep = (completedStepNumber) => {
  const storedProgress = localStorage.getItem('userProgress');
  const maxCompletedStep = storedProgress ? parseInt(storedProgress, 10) : -1;

  if (completedStepNumber > maxCompletedStep) {
    localStorage.setItem('userProgress', completedStepNumber.toString());
    console.log(`Step ${completedStepNumber} completed. Progress updated to: ${completedStepNumber}.`);
  }
};

/**
 * Utility to get the next step's path.
 * @param {number} currentStepNumber The current step number.
 * @returns {string} Path to the next step, or current path if it's the last step.
 */
export const getNextStepPath = (currentStepNumber) => {
  const nextStep = currentStepNumber + 1;
  if (STEP_PATHS[nextStep]) {
    return STEP_PATHS[nextStep];
  }
  // If there's no next step defined, perhaps stay on current or go to a summary/end page.
  // For now, let's return the path of the last known step (debriefing).
  return STEP_PATHS[Object.keys(STEP_PATHS).length - 1] || '/'; 
}; 