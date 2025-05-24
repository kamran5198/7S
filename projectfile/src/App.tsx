import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { SimulationPage } from './pages/SimulationPage';
import { DecisionsPage } from './pages/DecisionsPage';
import { ResultsPage } from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/decisions" element={<DecisionsPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;