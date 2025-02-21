// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './com/Mainpage';
import Login from './com/Login';
import Rank from './com/Rank';  
import Luxury from './com/Luxury'
import Men from './com/Men'
import Women from './com/Women'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/luxury" element={<Luxury />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
    </Routes>
  );
};

export default App;