// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Icon for theme toggle
import { useTheme } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  darkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleTheme, darkMode }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
