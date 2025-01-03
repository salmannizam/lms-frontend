import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd'; // Import DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import the backend
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DragAndDrop from './pages/DragAndDropTest';
import Topic1Page from './pages/topicPages/Topic1Page';
import Topic3Page from './pages/topicPages/Topic3Page';
import Topic2Page from './pages/topicPages/Topic2Page';
import Topic4Page from './pages/topicPages/Topic4Page';
import TestPage from './pages/TestPage';

const App: React.FC = () => {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}> {/* Wrap your app with DndProvider */}
        <div className="App">
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
        </div>
      </DndProvider>
    </Router>
  );
};

export default App;
