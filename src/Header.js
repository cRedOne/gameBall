// Header.js
import React from 'react';
import './App.css'; // Подключаем стили из отдельного файла

const Header = ({ username, score }) => {
  return (
    <div className="header">
      <div className="username">{username}</div>
      <div className="score">{score}</div>
    </div>
  );
};

export default Header;
