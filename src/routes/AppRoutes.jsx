import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import SetupPage from '../pages/SetupPage';
import InterviewRoomPage from '../pages/InterviewRoomPage';
import ResultPage from '../pages/ResultPage';
import AuthPage from '../pages/AuthPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/interview/:id" element={<InterviewRoomPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/feedback/:id" element={<ResultPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
