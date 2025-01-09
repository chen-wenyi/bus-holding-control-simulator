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
