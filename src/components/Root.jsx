import React from 'react';
import App from './App';
import Navbar from './layouts/Navbar';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Root() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Root;
