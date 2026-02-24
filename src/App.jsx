import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Display from './pages/Display';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
