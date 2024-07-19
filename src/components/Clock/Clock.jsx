import React, { useState, useEffect } from 'react';
import AnalogClock from 'analog-clock-react';
import './Clock.css';

const Clock = () => {
  const [clockOptions, setClockOptions] = useState({
    useCustomTime: true,
    width: "200px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "white",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff"
    },
    seconds: 0,
    minutes: 0,
    hours: 0
  });

  const updateClock = () => {
    let istTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    let date = new Date(istTime);

    // Decrement the time values to move anticlockwise
    let seconds = date.getSeconds() === 0 ? 59 : date.getSeconds() - 1;
    let minutes = date.getMinutes() === 0 ? 59 : date.getMinutes() - 1;
    let hours = date.getHours() === 0 ? 23 : date.getHours() - 1;

    setClockOptions(prevOptions => ({
      ...prevOptions,
      seconds,
      minutes,
      hours
    }));
  };

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='clock-container'>
      <div className="clock-wrapper">
        <AnalogClock {...clockOptions} />
        <div className="clock-numbers">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`number number-${i + 1}`}>{i + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clock;
