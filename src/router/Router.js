import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Solve from '../pages/Solve/SolvePage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/solve" element={<Solve />} />
    </Routes>
  );
}
export default AppRouter;
