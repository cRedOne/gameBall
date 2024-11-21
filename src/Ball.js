import React, { useState } from 'react';

const Ball = () => {
  // Стейт для изменения цвета шарика при клике
  const [color, setColor] = useState('#b0b0b0');
  const [userId, setUserId] = useState(null); // Стейт для ID пользователя

  // Обработчик клика по шарикам
  const handleClick = async () => {
    // Меняем цвет на случайный при каждом клике
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(newColor);

    // Получаем ID пользователя с сервера (если нужно)
    try {
      const response = await fetch('http://localhost:5000/get-user-id');  // Здесь предполагаем, что у вас есть этот маршрут
      const data = await response.json();
      const id = data.userId;
      setUserId(id); // Устанавливаем ID в стейт

      // Показываем alert с ID пользователя
      alert(`Пользователь с ID ${id} кликнул на шарик!`);
      
      // Отправляем запрос на сервер для отправки сообщения в Telegram
      const sendMessageResponse = await fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: id,  // Отправляем ID пользователя в теле запроса
          text: `Пользователь с ID ${id} кликнул на шарик!`,  // Текст сообщения
        }),
      });

      if (sendMessageResponse.ok) {
        console.log('Сообщение отправлено в Telegram');
      } else {
        console.error('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Ошибка с сервером:', error);
    }
  };

  // Обработчик для начала касания экрана
  const handleTouchStart = () => {
    console.log("Touch started on the ball!");
  };

  // Обработчик для окончания касания экрана
  const handleTouchEnd = () => {
    console.log("Touch ended on the ball!");
  };

  return (
    <div
      className="ball"
      style={{ background: color }}  // Цвет будет изменяться через инлайн-стили
      onClick={handleClick}  // Добавляем обработчик клика
      onTouchStart={handleTouchStart}  // Добавляем обработчик начала касания
      onTouchEnd={handleTouchEnd}  // Добавляем обработчик окончания касания
    >
      {/* Здесь можно добавить текст или другую информацию */}
    </div>
  );
}

export default Ball;
