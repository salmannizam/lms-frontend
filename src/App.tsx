import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';    // Import Header component
import Sidebar from './components/Sidebar';  // Import Sidebar component
import MainContent from './components/MainContent';  // Import Main Content area

import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DragAndDrop from './pages/DragAndDropTest';
import Topic1Page from './pages/topicPages/Topic1Page';
import Topic3Page from './pages/topicPages/Topic3Page';
import Topic2Page from './pages/topicPages/Topic2Page';
import Topic4Page from './pages/topicPages/Topic4Page';
import TestPage from './pages/TestPage';

// Define Light and Dark Themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },  // Light Blue
    background: { default: '#f0f0f0', paper: '#ffffff' }, // Light Background
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#bb86fc' },  // Purple
    background: { default: '#121212', paper: '#1f1f1f' }, // Dark Background
  },
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  // Memoize the theme based on darkMode state
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  // Toggle between dark and light mode
  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Handle sidebar open and close
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Header with Theme Toggle */}
          <Header onMenuClick={handleDrawerOpen} toggleTheme={toggleTheme} darkMode={darkMode} />

          {/* Sidebar */}
          <Sidebar open={open} onClose={handleDrawerClose} />

          {/* Main Content */}
          <MainContent open={open}>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/topic/topic1" element={<Topic1Page />} />
              <Route path="/topic/topic2" element={<Topic2Page />} />
              <Route path="/topic/topic3" element={<Topic3Page />} />
              <Route path="/topic/topic4" element={<Topic4Page />} />
              <Route path="/test/:token" element={<TestPage />} />
              <Route path="/test/results/:token" element={<ResultsPage />} />
              <Route path="/drag" element={<DragAndDrop />} />
            </Routes>

          </MainContent>
        </ThemeProvider>
      </DndProvider>
    </Router>
  );
};

export default App;
