import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface HeaderProps {
  onMenuClick: () => void;
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, toggleTheme, darkMode }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LMS
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
