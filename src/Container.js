// src/components/Container.js
import React from 'react';
import Ball from './Ball';  // Импортируем компонент Ball
import './App.css';  // Импортируем стили

const Container = () => {
  return (
    <div className="container">  {/* Контейнер для шарика */}
      <Ball />  {/* Вставляем компонент Ball */}
    </div>
  );
}

export default Container;
