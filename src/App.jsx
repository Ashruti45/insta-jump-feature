import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Profile from './pages/Profile';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}