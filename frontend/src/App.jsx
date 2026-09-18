import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

import Dashboard from './pages/Dashboard';
import ExplorePage from './pages/ExplorePage';
import FacilitiesPage from './pages/FacilitiesPage';
import AboutUsPage from './pages/AboutUsPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChatPage from './pages/ChatPage';
import ConnectPage from './pages/ConnectPage';

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/chat/:documentId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App