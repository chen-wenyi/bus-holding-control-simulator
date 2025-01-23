import { TimeElapsed } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { twMerge } from 'tailwind-merge';
dayjs.extend(duration);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeElapsed(distance: number): TimeElapsed {
  distance = distance + 1;
  const duration = dayjs.duration(distance, 'seconds');
  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
    distance,
  };
}

export function formatTime(time: number) {
  return String(time).padStart(2, '0');
}

export const getDetailedTime = (seconds: number) => {
  const time = dayjs.duration(seconds, 'seconds');
  return {
    days: time.days(),
    hours: time.hours(),
    minutes: time.minutes(),
    seconds: time.seconds(),
  };
};

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

type CountdownCallbacks = {
  onUpdate?: (timeLeft: number) => void;
  onComplete?: () => void;
};

export function createCountdown(
  duration: number, // in milliseconds
  callbacks: CountdownCallbacks = {}
) {
  const onUpdate = callbacks.onUpdate || (() => {});
  let onComplete = callbacks.onComplete || (() => {});

  let startTime: number | null = null;
  let pausedTime: number | null = null;
  let remainingTime: number = duration;
  let isPaused: boolean = false;

  function update(timestamp: number): void {
    if (startTime === null) startTime = timestamp;

    if (isPaused) {
      pausedTime = timestamp;
      return; // Skip updating while paused
    }

    if (pausedTime !== null) {
      startTime += timestamp - pausedTime; // Adjust for the paused duration
      pausedTime = null;
    }

    const elapsed = timestamp - startTime;
    const timeLeft = Math.max(remainingTime - elapsed, 0);

    onUpdate(timeLeft);

    if (timeLeft > 0) {
      requestAnimationFrame(update);
    } else {
      onComplete();
    }
  }

  function start(): void {
    if (remainingTime > 0) {
      isPaused = false;
      requestAnimationFrame(update);
    }
  }

  function pause(): void {
    isPaused = true;
  }

  function resume(): void {
    if (isPaused && remainingTime > 0) {
      isPaused = false;
      requestAnimationFrame(update);
    }
  }

  function reset(newDuration?: number, newOnComplete?: () => void): void {
    if (newDuration !== undefined) duration = newDuration;
    remainingTime = duration;
    startTime = null;
    pausedTime = null;
    isPaused = false;

    // Update the onComplete callback if provided
    if (newOnComplete) {
      onComplete = newOnComplete;
    }
  }

  return {
    start,
    pause,
    resume,
    reset,
  };
}
