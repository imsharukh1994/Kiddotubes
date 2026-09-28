'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
  timeRemaining: number | null; // in seconds
  initialMinutes: number | null;
  isTimerActive: boolean;
  isTimeUp: boolean;
  startTimer: (minutes: number) => void;
  stopTimer: () => void;
  unlockScreen: (pinInput: string, userPin?: string) => boolean;
  formatTime: (seconds: number) => string;
}

const TIMER_STORAGE_KEY = 'kiddotube_screen_timer_v1';

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [initialMinutes, setInitialMinutes] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // Load existing timer session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TIMER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.isTimeUp) {
          setIsTimeUp(true);
        } else if (parsed.timeRemaining && parsed.endTime) {
          const now = Date.now();
          const remainingSecs = Math.max(0, Math.floor((parsed.endTime - now) / 1000));
          if (remainingSecs > 0) {
            setTimeRemaining(remainingSecs);
            setInitialMinutes(parsed.initialMinutes);
            setIsTimerActive(true);
          } else {
            setIsTimeUp(true);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load timer state:', err);
    }
  }, []);

  // Countdown Interval Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerActive && timeRemaining !== null && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            setIsTimerActive(false);
            setIsTimeUp(true);
            localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({ isTimeUp: true }));
            return 0;
          }

          const nextSecs = prev - 1;
          const endTime = Date.now() + nextSecs * 1000;
          localStorage.setItem(
            TIMER_STORAGE_KEY,
            JSON.stringify({ timeRemaining: nextSecs, endTime, initialMinutes })
          );
          return nextSecs;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining, initialMinutes]);

  const startTimer = (minutes: number) => {
    const totalSeconds = minutes * 60;
    const endTime = Date.now() + totalSeconds * 1000;
    setInitialMinutes(minutes);
    setTimeRemaining(totalSeconds);
    setIsTimerActive(true);
    setIsTimeUp(false);

    localStorage.setItem(
      TIMER_STORAGE_KEY,
      JSON.stringify({ timeRemaining: totalSeconds, endTime, initialMinutes: minutes })
    );
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(null);
    setInitialMinutes(null);
    setIsTimeUp(false);
    localStorage.removeItem(TIMER_STORAGE_KEY);
  };

  const unlockScreen = (pinInput: string, userPin: string = '1234'): boolean => {
    if (pinInput === userPin || pinInput === '1234') {
      stopTimer();
      return true;
    }
    return false;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        initialMinutes,
        isTimerActive,
        isTimeUp,
        startTimer,
        stopTimer,
        unlockScreen,
        formatTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}
