// src/App.js
import React from 'react';
import './App.css';
import Container from './Container';  // Импортируем компонент Container

function App() {
  return (
    <div className="App">
      <h1></h1>
      <Container /> {/* Используем компонент Container */}
    </div>
  );
}

export default App;
