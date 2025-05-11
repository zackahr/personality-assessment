import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery, Tooltip, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ScienceIcon from '@mui/icons-material/Science';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link as RouterLink, useLocation, Outlet } from 'react-router-dom';
import { QuestionAnswer, GroupAdd } from '@mui/icons-material';
import { STEP_PATHS, getStepFromPath } from './hooks/useStepGuard';

const drawerWidth = 250;

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const storedProgress = localStorage.getItem('userProgress');
  const maxCompletedStep = storedProgress ? parseInt(storedProgress, 10) : -1;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItemsTop = [
    { text: 'Welcome', icon: <DashboardIcon />, path: '/' },
    { text: 'Personality Test', icon: <ScienceIcon />, path: '/personality-test' },
    { text: 'Task Description', icon: <DescriptionIcon />, path: '/task-description' },
    { text: 'How to Evaluate', icon: <GroupAdd />, path: '/how-to-evaluate' },
    { text: 'Reflection', icon: <QuestionAnswer />, path: '/why' },
    { text: 'Debriefing', icon: <DescriptionIcon />, path: '/debriefing' },
  ];

  const visibleNavItems = navItemsTop.filter(item => {
    const itemStep = getStepFromPath(item.path);
    const currentPathStep = getStepFromPath(location.pathname);
    return itemStep <= maxCompletedStep + 1 || itemStep === currentPathStep;
  });

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
        <ScienceIcon sx={{ mr: 1.5, fontSize: '2rem' }} />
        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Trait Pilot
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, p: 1 }}>
        {visibleNavItems.map((item) => {
          const itemStep = getStepFromPath(item.path);
          const isEnabled = itemStep <= maxCompletedStep + 1;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={isActive(item.path)}
                disabled={!isEnabled}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  minHeight: 48,
                  px: 2.5,
                  color: isActive(item.path) ? theme.palette.primary.main : (isEnabled ? theme.palette.text.secondary : theme.palette.text.disabled),
                  backgroundColor: isActive(item.path) ? theme.palette.action.selected : 'transparent',
                  cursor: isEnabled ? 'pointer' : 'not-allowed',
                  opacity: isEnabled ? 1 : 0.6,
                  '&:hover': {
                    backgroundColor: isEnabled ? theme.palette.action.hover : 'transparent',
                    color: isEnabled ? theme.palette.primary.main : theme.palette.text.disabled,
                    '& .MuiListItemIcon-root': { color: isEnabled ? theme.palette.primary.main : theme.palette.text.disabled, }
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': { color: theme.palette.primary.contrastText, },
                    '&:hover': { backgroundColor: theme.palette.primary.dark, }
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isActive(item.path) ? 2 : 2, justifyContent: 'center', color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive(item.path) ? 'bold' : 'normal', variant: 'body2' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const currentPage = navItemsTop.find(item => isActive(item.path));
  const pageTitle = currentPage ? currentPage.text : (location.pathname.startsWith('/profile/') ? 'View Profile' : 'SciPlatform');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" elevation={0} sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, zIndex: theme.zIndex.drawer + 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="main navigation">
        <Drawer variant={isMobile ? "temporary" : "permanent"} open={isMobile ? mobileOpen : true} onClose={isMobile ? handleDrawerToggle : undefined} ModalProps={{ keepMounted: true, }} sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: { md: `1px solid ${theme.palette.divider}` }, backgroundColor: theme.palette.background.paper, }, }}>
          {drawerContent}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 4 }, width: { md: `calc(100% - ${drawerWidth}px)` }, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Toolbar />
        <Container component="section" maxWidth={false} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 2, mb: 2, p:0 }}>
          <React.Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}><CircularProgress /></Box>}>
            <Outlet />
          </React.Suspense>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 