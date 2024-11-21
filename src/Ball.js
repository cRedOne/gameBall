import React, { useState } from 'react';  // Импортируем useState для изменения состояния компонента

const Ball = () => {
  // Стейт для изменения цвета шарика при клике
  const [color, setColor] = useState('#b0b0b0');  // Изначальный цвет шарика

  // Обработчик клика по шарикам
  const handleClick = async () => {
    // Меняем цвет на случайный при каждом клике
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(newColor);  // Обновляем цвет

    // Выполняем анимацию (например, увеличиваем шарик)
    const ballElement = document.querySelector('.ball');
    ballElement.style.transform = 'scale(1.2)';  // Увеличиваем шарик на 50%
    setTimeout(() => {
      ballElement.style.transform = 'scale(1)';  // Возвращаем шарик в исходный размер
    }, 300);  // 300 миллисекунд для плавного эффекта

    // Получаем ID пользователя (например, это может быть динамическое значение, хранимое в state или сессии)
    const userId = 123456;  // В реальном приложении это может быть получено через контекст или сессии

    try {
      // Отправляем запрос на сервер для обработки
      const response = await fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: userId,  // Отправляем ID пользователя (chatId) в теле запроса
          text: `Пользователь с ID ${userId} кликнул на шарик!`,  // Текст сообщения
        }),
      });

      if (response.ok) {
        console.log('Сообщение отправлено в Telegram');
      } else {
        console.error('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Ошибка с сервером:', error);
    }
  };

  // Обработчик для начала касания экрана (к примеру, эффект при касании)
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
      {/* Можно добавить текст внутри шарика, например: */}
     
    </div>
  );
}

export default Ball;
