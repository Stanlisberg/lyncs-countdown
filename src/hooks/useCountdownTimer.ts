import { useState, useEffect } from "react";
import type { ITimeRemaining, IUrgencyLevel } from "../types/interface";

function calculateTimeRemaining(targetDate: string): ITimeRemaining {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPast: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalSeconds, isPast: false };
}

export function getUrgencyLevel(timeRemaining: ITimeRemaining): IUrgencyLevel {
  if (timeRemaining.isPast) return "past";
  if (timeRemaining.days <= 1) return "imminent";
  if (timeRemaining.days <= 7) return "upcoming";
  return "distant";
}

export function useCountdown(targetDate: string): ITimeRemaining {
  const [timeRemaining, setTimeRemaining] = useState<ITimeRemaining>(() =>
    calculateTimeRemaining(targetDate),
  );

  useEffect(() => {
    const update = () => setTimeRemaining(calculateTimeRemaining(targetDate));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}
