import React, { useEffect } from 'react';

const BinaryRain = () => {
  useEffect(() => {
    const container = document.querySelector('.binary-container');
    const digits = '01';
    const totalDigits = 150;

    // Create binary digits
    for (let i = 0; i < totalDigits; i++) {
      const digit = document.createElement('div');
      digit.className = 'binary-digit';
      digit.textContent = Math.random() > 0.5 ? '1' : '0';
      
      // Random position
      digit.style.left = `${Math.random() * 100}%`;
      digit.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      digit.style.animationDelay = `${Math.random() * 20}s`;
      digit.style.animationDuration = `${10 + Math.random() * 20}s`;
      
      container.appendChild(digit);
    }

    // Update binary digits
    const updateDigits = () => {
      document.querySelectorAll('.binary-digit').forEach(digit => {
        if (Math.random() > 0.95) {
          digit.textContent = Math.random() > 0.5 ? '1' : '0';
          digit.style.opacity = Math.random() * 0.5 + 0.2;
        }
      });
    };

    const interval = setInterval(updateDigits, 100);

    return () => {
      clearInterval(interval);
      document.querySelectorAll('.binary-digit').forEach(d => d.remove());
    };
  }, []);

  return (
    <>
      <div className="binary-container"></div>
      <div className="scan-line"></div>
      <div className="crt-effect"></div>
    </>
  );
};

export default BinaryRain;