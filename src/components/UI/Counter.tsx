"use client";

import { useState, useEffect } from "react";

type Duration = {
  value: number;
  unit: "hours" | "minutes" | "seconds";
};

interface FlashSaleCounterProps {
  duration: Duration;
}

const FlashSaleCounter = ({ duration }: FlashSaleCounterProps) => {
  // Calculate end time based on duration prop
  const [endTime, setEndTime] = useState<Date>(() => {
    const now = new Date();
    if (duration.unit === "hours") {
      now.setHours(now.getHours() + duration.value);
    } else if (duration.unit === "minutes") {
      now.setMinutes(now.getMinutes() + duration.value);
    } else {
      now.setSeconds(now.getSeconds() + duration.value);
    }
    return now;
  });

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Format numbers to two digits
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [endTime]);

  // Reset end time when duration changes
  useEffect(() => {
    const now = new Date();
    if (duration.unit === "hours") {
      now.setHours(now.getHours() + duration.value);
    } else if (duration.unit === "minutes") {
      now.setMinutes(now.getMinutes() + duration.value);
    } else {
      now.setSeconds(now.getSeconds() + duration.value);
    }
    setEndTime(now);
  }, [duration]);

  return (
    <div className="">
      <div className="flex space-x-2">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-main rounded-md px-3 py-1">
            <span className="text-xl font-bold text-white">
              {formatTime(timeLeft.hours)}
            </span>
          </div>
        </div>
        <span className="text-xl font-bold">:</span>
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-main rounded-md px-3 py-1 text-white">
            <span className="text-xl font-bold">
              {formatTime(timeLeft.minutes)}
            </span>
          </div>
        </div>
        <span className="text-xl font-bold">:</span>
        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-main rounded-md px-3 py-1 text-white">
            <span className="text-xl font-bold">
              {formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCounter;
