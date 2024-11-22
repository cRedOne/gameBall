import React, { useState, useEffect } from 'react';

// Компонент для отображения шарика
const Ball = () => {
  const [color, setColor] = useState('radial-gradient(circle, #b0b0b0, #595959)');  // Начальный градиентный цвет
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [animationState, setAnimationState] = useState(false);

  const [position, setPosition] = useState({ x: 50, y: 50 }); // Начальная позиция в процентах
  const [delta, setDelta] = useState({ x: 0, y: 0 }); // Для отображения смещения
  const [isMoving, setIsMoving] = useState(false);  // Состояние движения

  // Коэффициент для увеличения движения
  const moveCoefficient = 1; 

  const ballStyle = {
    borderRadius: '50%',
    width: isEnlarged ? '120px' : '100px',
    height: isEnlarged ? '120px' : '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'width 0.3s ease, height 0.3s ease',
    background: color,
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: 'translate(-50%, -50%)',
  };

  const offsetStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    color: 'white',
    fontSize: '16px',
    zIndex: 1000, // Для вывода данных поверх других элементов
  };

  // Функция старта акселерометра
  const startAccelerometer = () => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }
  };

  // Функция остановки акселерометра
  const stopAccelerometer = () => {
    if (window.DeviceMotionEvent) {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    }
  };

  // Обработчик акселерометра
  const handleDeviceMotion = (event) => {
    const { x, y } = event.accelerationIncludingGravity;
    const roundedX = Math.round(x * 100) / 100;
    const roundedY = Math.round(y * 100) / 100;

    if (isMoving) {
      setPosition(prevPosition => ({
        x: Math.max(0, Math.min(100, prevPosition.x + roundedX * moveCoefficient)),
        y: Math.max(0, Math.min(100, prevPosition.y + roundedY * moveCoefficient)),
      }));

      setDelta(prevDelta => ({
        x: prevDelta.x + roundedX * moveCoefficient,
        y: prevDelta.y + roundedY * moveCoefficient,
      }));
    }
  };

  // Эффект для отслеживания акселерометра
  useEffect(() => {
    if (isMoving) {
      startAccelerometer();
    } else {
      stopAccelerometer();
    }

    return () => stopAccelerometer();
  }, [isMoving]);

  // Функция обработки клика
  const handleClick = () => {
    if (isMoving) {
      setIsMoving(false);
      setColor('radial-gradient(circle, #b0b0b0, #595959)');  // Восстанавливаем начальный цвет
      setAnimationState(false);
    } else {
      setIsMoving(true);
      setColor('red');  // Делаем шарик красным
      setAnimationState(true);
    }
  };

  return (
    <div>
      <div
        className={`ball ${animationState ? 'animated' : ''}`}
        style={ballStyle}
        onClick={handleClick}
      >
        {/* Шарик */}
      </div>

      {/* Вывод данных смещения */}
      <div style={offsetStyle}>
        <h3>Смещение шарика:</h3>
        <p>Дельта X: {delta.x.toFixed(2)}%</p>
        <p>Дельта Y: {delta.y.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Ball;
