import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Formulario from './pages/Formulario';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/formulario" element={<Formulario />} />
    </Routes>
  );
}

export default App;