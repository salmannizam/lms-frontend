import React from 'react';
import { Box, Toolbar } from '@mui/material';

interface MainContentProps {
  open: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ open, children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        backgroundColor: 'background.default',
        padding: 3,
        transition: 'margin 0.3s ease',
        ...(open && { marginLeft: 240 }),  // Adjust content when sidebar is open
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
};

export default MainContent;
