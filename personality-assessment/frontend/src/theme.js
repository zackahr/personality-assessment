import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A7CA5', // Professional Blue
    },
    secondary: {
      main: '#44AF69', // Muted Teal/Green
    },
    accent: { // Custom palette key for specific highlights
      main: '#F9A620', // Muted Orange/Yellow
    },
    error: {
      main: '#D32F2F', // Standard MUI Red, or customize e.g. #EF4444
    },
    warning: {
      main: '#FFA000', // Standard MUI Amber, or customize e.g. #FDBA74
    },
    info: {
      main: '#1976D2',   // Standard MUI Blue, or customize e.g. #A2D2FF
    },
    success: {
      main: '#388E3C', // Standard MUI Green, or customize e.g. #86DC3D
    },
    background: {
      default: '#F4F7F6', // Off-white
      paper: '#FFFFFF',   // Pure white for cards, etc.
    },
    text: {
      primary: '#2F3E46',   // Dark Gray for main text
      secondary: '#58707C', // Lighter Gray for secondary text
      disabled: '#9E9E9E',
    },
    // Custom semantic colors for experiment stages
    stages: {
        setup: '#A2D2FF',       // Light Blue
        execution: '#FDBA74',    // Active Orange
        results: '#86DC3D',      // Conclusive Green
        archived: '#B0BEC5',     // Muted Grey
    },
    divider: 'rgba(47, 62, 70, 0.12)', // Using a derivative of text primary for subtlety
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, color: '#2F3E46' },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2, color: '#2F3E46' },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.3, color: '#2F3E46' },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.3, color: '#2F3E46' },
    h5: { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.4, color: '#2F3E46' },
    h6: { fontWeight: 500, fontSize: '1.1rem', lineHeight: 1.4, color: '#2F3E46' },
    subtitle1: { fontSize: '1rem', lineHeight: 1.5, color: '#58707C' },
    subtitle2: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 500, color: '#58707C' },
    body1: { fontSize: '1rem', lineHeight: 1.6, color: '#2F3E46' },
    body2: { fontSize: '0.875rem', lineHeight: 1.5, color: '#58707C' },
    button: {
      textTransform: 'none', // Modern buttons without all caps
      fontWeight: 600,
      fontSize: '0.9375rem', // 15px
    },
    caption: { fontSize: '0.75rem', lineHeight: 1.4, color: '#58707C' },
    overline: { fontSize: '0.75rem', lineHeight: 1.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
  },
  shape: {
    borderRadius: 8, // Softer corners for a modern look
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // White app bar
          color: '#2F3E46',         // Dark text
          boxShadow: '0 1px 3px rgba(47, 62, 70, 0.1)', // Subtle shadow
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0, // Default to no shadow, apply shadows explicitly for depth
      },
      styleOverrides: {
        root: {
          // Common paper styles can go here if needed
          // Example: Adding a subtle border to all papers
          // border: '1px solid rgba(47, 62, 70, 0.08)',
        },
        outlined: { // For cards or sections that need a border
            border: '1px solid rgba(47, 62, 70, 0.12)'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flatter buttons by default
      },
      styleOverrides: {
        root: {
          padding: '8px 16px', // Consistent padding
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#30698F', // Slightly darker shade for hover
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#399A5C',
          },
        },
      },
    },
    MuiCard: { // Cards are frequently used, good to style them
        styleOverrides: {
            root: {
                border: '1px solid rgba(47, 62, 70, 0.12)', // Consistent border for cards
                boxShadow: 'none', // Remove default MUI Card shadow if Paper default is elevation 0
            }
        }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#2F3E46', // Dark tooltip for good contrast
          color: '#FFFFFF',
          fontSize: '0.8rem',
        },
        arrow: {
          color: '#2F3E46',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        }
      }
    },
    MuiTextField: {
        defaultProps: {
            variant: 'outlined', // Default to outlined
        },
        styleOverrides: {
            root: {
                // Custom styles if needed
            }
        }
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                // backgroundColor: '#FFFFFF', // Ensure input backgrounds are white if needed
            }
        }
    },
    MuiCssBaseline: { // Global style overrides
      styleOverrides: `
        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        body {
          overscroll-behavior-y: none; // Prevents pull-to-refresh on some mobile browsers
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        #root { // Assuming your root div has id="root"
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `,
    },
  }
});

export default theme; 