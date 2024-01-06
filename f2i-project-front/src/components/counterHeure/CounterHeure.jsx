import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CounterHeure = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [userInput, setUserInput] = useState(35);

  const startCountdown = () => {
    const totalDays = parseInt(userInput, 10);
    if (!isNaN(totalDays) && totalDays > 0) {
      const totalSeconds = totalDays * 24 * 60 * 60;
      setTotalSeconds(totalSeconds);
    }
  };

  useEffect(() => {
    if (userInput) {
      startCountdown();
    }
  }, [userInput]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        setTotalSeconds((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds]);

  useEffect(() => {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [totalSeconds]);
  return (
    <div className="container mx-auto my-10 flex flex-col md:flex-row justify-between items-center bg-orange-500 p-4 text-white">
      <div>
        <p className="font-semibold text-lg">
          Participer avant le 15/12/2023 pour gagner
        </p>
        <Link to="/conditions" className="text-sm underline mt-1 inline-block">
          *Voir Conditions générales
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center mx-2">
          <span className="text-2xl font-bold">{days}</span>
          <span className="text-sm">jours</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center mx-2">
          <span className="text-2xl font-bold">{hours}</span>
          <span className="text-sm">heures</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center mx-2">
          <span className="text-2xl font-bold">{minutes}</span>
          <span className="text-sm">minutes</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center mx-2">
          <span className="text-2xl font-bold">{seconds}</span>
          <span className="text-sm">secondes</span>
        </div>
      </div>
    </div>
  );
};

export default CounterHeure;
