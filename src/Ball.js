import React, { useState } from 'react';

const Ball = () => {
  // Стейт для изменения цвета шарика при клике
  const [color, setColor] = useState('#b0b0b0');
  const [userId, setUserId] = useState(null); // Стейт для ID пользователя
  const [animationState, setAnimationState] = useState(false); // Стейт для анимации
  const [isEnlarged, setIsEnlarged] = useState(false); // Стейт для отслеживания увеличения размера

  // Обработчик клика по шарикам
  const handleClick = async () => {
    // Меняем цвет на случайный при каждом клике
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(newColor);

    // Получаем ID пользователя с сервера
    try {
      const response = await fetch('http://localhost:5000/get-user-id');  // Запрос к серверу, где получаем ID пользователя
      const data = await response.json();
      const id = data.userId;
      setUserId(id); // Устанавливаем ID в состояние

      // Показываем ID в виде alert (или можно сделать что-то другое)
      alert(`Пользователь с ID ${id} кликнул на шарик!`);

      // Включаем анимацию для шарика
      setAnimationState(true);
      setIsEnlarged(true);  // Включаем увеличение шарика

      // Ожидаем 1 секунду и выключаем анимацию
      setTimeout(() => {
        setAnimationState(false);
        setIsEnlarged(false); // Восстанавливаем нормальный размер после 1 секунды
      }, 1000);
    } catch (error) {
      console.error('Ошибка с сервером:', error);
    }
  };

  // Обработчик для начала касания экрана
  const handleTouchStart = () => {
    console.log('Touch started on the ball!');
  };

  // Обработчик для окончания касания экрана
  const handleTouchEnd = () => {
    console.log('Touch ended on the ball!');
  };

  return (
    <div
      className={`ball ${animationState ? 'animated' : ''}`}  // Добавляем анимацию при клике
      style={{
        background: color,         // Цвет будет изменяться через инлайн-стили
        borderRadius: '50%',       // Шарик будет круглый
        width: isEnlarged ? '150px' : '100px', // Увеличиваем размер на 50% при клике
        height: isEnlarged ? '150px' : '100px', // Увеличиваем размер на 50% при клике
        display: 'flex',           // Используем flexbox для центрирования
        justifyContent: 'center',  // Центрируем содержимое по горизонтали
        alignItems: 'center',      // Центрируем содержимое по вертикали
        cursor: 'pointer',         // Указатель мыши как указатель для кликабельного элемента
        transition: 'all 0.3s ease', // Плавное изменение для анимации
      }}
      onClick={handleClick}           // Добавляем обработчик клика
      onTouchStart={handleTouchStart} // Добавляем обработчик начала касания
      onTouchEnd={handleTouchEnd}     // Добавляем обработчик окончания касания
    >
      {/* Можно добавить ID пользователя в интерфейс, чтобы он отображался */}
      {userId && <p style={{ color: '#fff', fontSize: '14px' }}>Твой ID: {userId}</p>}
    </div>
  );
}

export default Ball;
