// src/App.js
import React from 'react';
import './App.css';
import Container from './Container';  // Импортируем компонент Container
import Header from './Header';        // Импортируем компонент Header

function App() {
  const username = 'User123';  // Пример юзернейма
  const score = 100;           // Пример счёта

  return (
    <div className="App">
      <Header username={username} score={score} /> {/* Вставляем Header */}
      <Container /> {/* Используем компонент Container */}
    </div>
  );
}

export default App;
