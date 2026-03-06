import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Algorithm from '../pages/Algorithm/AlgorithmPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/algorithm" element={<Algorithm />} />
    </Routes>
  );
}
export default AppRouter;
