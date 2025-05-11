import { createTheme } from '@mui/material/styles';

// Define base colors for reuse (optional, but good for consistency)
const cobaltBlue = '#0047AB'; // Elemental: Cobalt Blue (New Primary)
const kineticTeal = '#00C4B3'; // Vibrant (New Secondary)
const chargedAmber = '#FFA726'; // Accent

// Phase: Setup
const silentViolet = '#A09ABC';
const mistedTeal = '#A0D2DB';
const silverSpark = '#D6D8DB';
const faintLilac = '#E0D6F1';
const quillWhite = '#F6F8FA';
const graphite = '#4A4E5A';

// Phase: Execution
// kineticTeal already defined
const vividCoral = '#FF7F50';
const protonPink = '#F04C80';
const electronYellow = '#FFF200'; // Note: Pure yellow can have contrast issues, use carefully
const opticalWhite = '#FFFFFF';
const deepSpaceGray = '#2F3E46'; // Existing text.primary

// Phase: Results
const indigoDepth = '#283593';
const terraCotta = '#B85A39';
const goldLeaf = '#D4AF37'; // Muted gold
const archiveIvory = '#FFFFF0';
const parchment = '#FCFBF7';
const obsidian = '#1C1C1E';

// Functional Colors
const signalRed = '#D62828';
const cautionAmber = '#F7B731';
const validationGreen = '#28A745';
const informationalBlue = '#4A90E2';
const progressGray = '#B0B0B0';

// Elemental Palette
const mercurySilver = '#C0C0C0';
const oxygenWhite = '#FFFFFF'; // Same as opticalWhite
// cobaltBlue defined
const copperPatina = '#527F76';

// Neutrals (general use, can be derived from phases too)
const stoneGray = '#78818F';

const theme = createTheme({
  palette: {
    primary: {
      main: cobaltBlue, // Using elemental Cobalt Blue as general primary
    },
    secondary: {
      main: kineticTeal, // Using Kinetic Teal as general secondary
    },
    accent: { // General accent
      main: chargedAmber,
    },
    error: {
      main: signalRed,
    },
    warning: {
      main: cautionAmber,
    },
    info: {
      main: informationalBlue,
    },
    success: {
      main: validationGreen,
    },
    
    // General Background & Text for Light Mode
    background: {
      default: quillWhite, // Soft, cool off-white from Setup phase
      paper: opticalWhite,   // Pure white for cards, from Execution phase for crispness
    },
    text: {
      primary: deepSpaceGray,   // Dark Gray for main text
      secondary: stoneGray, // Lighter Gray for secondary text
      disabled: '#9E9E9E', // Standard disabled color
    },

    // Phase-Specific Palettes
    phaseSetup: {
      main: silentViolet,
      secondary: mistedTeal,
      accent1: silverSpark,
      accent2: faintLilac,
      background: quillWhite,
      text: graphite,
      contrastText: '#FFFFFF', // Assuming high contrast needed for main color
    },
    phaseExecution: {
      main: kineticTeal,
      secondary: vividCoral,
      accent1: protonPink,
      accent2: electronYellow,
      background: opticalWhite,
      text: deepSpaceGray,
      contrastText: '#000000', // Kinetic teal is light, needs dark text
    },
    phaseResults: {
      main: indigoDepth,
      secondary: terraCotta,
      accent1: goldLeaf,
      accent2: archiveIvory,
      background: parchment,
      text: obsidian,
      contrastText: '#FFFFFF',
    },

    // Updated 'stages' for direct use based on phase primaries
    stages: {
        setup: silentViolet,
        execution: kineticTeal,
        results: indigoDepth,
        archived: '#B0BEC5',     // Muted Grey (can be refined)
    },

    // Elemental colors for thematic accents
    elemental: {
      mercurySilver: mercurySilver,
      oxygenWhite: oxygenWhite,
      cobaltBlue: cobaltBlue,
      copperPatina: copperPatina,
    },
    
    // Functional UI colors
    progress: {
      background: progressGray,
      // Fill color would typically be set dynamically based on context (e.g., phase.main)
    },

    divider: 'rgba(0, 0, 0, 0.12)', // Standard divider

    // Conceptual Dark Mode Palette Structure
    // This would be activated by a theme toggler in a real app
    dark: {
      primary: { // Example: Dark mode primary could be a brighter version of light's
        main: '#64B5F6', // Brighter Blue
      },
      secondary: {
        main: '#4DB6AC', // Brighter Teal
      },
      accent: {
        main: '#FFC974', // Softer Amber
      },
      error: { main: '#EF5350' }, // Slightly adjusted reds/greens for dark bg if needed
      warning: { main: '#FFA726' },
      info: { main: '#42A5F5' },
      success: { main: '#66BB6A' },
      background: {
        default: '#121212', // Common dark mode background
        paper: '#1E1E1E',   // Slightly lighter for cards
      },
      text: {
        primary: '#E0E0E0',
        secondary: '#BDBDBD',
        disabled: '#757575',
      },
      phaseSetup: {
        main: '#C2B2E0', // Lighter violet
        secondary: '#B0E0E6',
        accent1: '#E0E0E0',
        accent2: '#F0E8FF',
        background: '#2C2A3A', // Deep violet
        text: '#F5F5F5',
        contrastText: '#000000',
      },
      phaseExecution: {
        main: '#00E0C7', // Maintain vibrancy
        secondary: '#FF8A65',
        accent1: '#F48FB1',
        accent2: '#FFF59D',
        background: '#1A1A1A', // Very dark
        text: '#FFFFFF',
        contrastText: '#000000',
      },
      phaseResults: {
        main: '#5C6BC0', // Lighter indigo
        secondary: '#C88775',
        accent1: '#E6C66E',
        accent2: '#FFFFF0', // Keep ivory light
        background: '#212A54', // Deep indigo dark
        text: '#F5F5F5',
        contrastText: '#FFFFFF',
      },
      stages: {
        setup: '#C2B2E0',
        execution: '#00E0C7',
        results: '#5C6BC0',
        archived: '#78909C',
      },
      elemental: { // Assuming they might appear brighter or different on dark
        mercurySilver: '#A0A0A0',
        oxygenWhite: '#E0E0E0', // Not pure white on dark usually
        cobaltBlue: '#64B5F6',
        copperPatina: '#73A099',
      },
      progress: {
        background: '#424242',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, /* color will be text.primary */ },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2, /* color will be text.primary */ },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.3, /* color will be text.primary */ },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.3, /* color will be text.primary */ },
    h5: { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.4, /* color will be text.primary */ },
    h6: { fontWeight: 500, fontSize: '1.1rem', lineHeight: 1.4, /* color will be text.primary */ },
    subtitle1: { fontSize: '1rem', lineHeight: 1.5, /* color will be text.secondary */ },
    subtitle2: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 500, /* color will be text.secondary */ },
    body1: { fontSize: '1rem', lineHeight: 1.6, /* color will be text.primary */ },
    body2: { fontSize: '0.875rem', lineHeight: 1.5, /* color will be text.secondary */ },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9375rem',
    },
    caption: { fontSize: '0.75rem', lineHeight: 1.4, /* color will be text.secondary */ },
    overline: { fontSize: '0.75rem', lineHeight: 1.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({ // Use theme callback to access palette
          backgroundColor: theme.palette.background.paper, // Use paper for AppBar for some elevation feel
          color: theme.palette.text.primary,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          // border: '1px solid rgba(0,0,0,0.08)', // Example, if wanted
        },
        outlined: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`
        })
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
        containedPrimary: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.dark || theme.palette.primary.main, // Add fallback if dark isn't defined for primary
          },
        }),
        containedSecondary: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark || theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 'none',
            })
        }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.text.primary, // Dark tooltip for good contrast on light bg
          color: theme.palette.background.paper, // Light text
          fontSize: '0.8rem',
        }),
        arrow: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
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
            variant: 'outlined',
        },
        styleOverrides: {
            root: {
                // Custom styles if needed
            }
        }
    },
    MuiInputBase: {
        styleOverrides: {
            root: ({ theme }) => ({
                 backgroundColor: theme.palette.background.paper, // Ensure input backgrounds consistent
            })
        }
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        body {
          overscroll-behavior-y: none;
          background-color: ${themeParam.palette.background.default};
          color: ${themeParam.palette.text.primary};
        }
        a {
          text-decoration: none;
          color: ${themeParam.palette.primary.main};
        }
        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        /* Custom scrollbar for a more modern feel (optional) */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${themeParam.palette.background.default};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${themeParam.palette.divider};
          border-radius: 4px;
          border: 2px solid ${themeParam.palette.background.default};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${themeParam.palette.text.secondary};
        }
      `,
    },
  }
});

export default theme; 