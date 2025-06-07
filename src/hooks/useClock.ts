'use client'
import { useState, useEffect } from 'react';

export function useClock(updateInterval: number = 1000) {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, updateInterval);

        return () => clearInterval(interval);
    }, [updateInterval]);

    return {
        time: {
            hours: time.getHours().toString().padStart(2, '0'),
            minutes: time.getMinutes().toString().padStart(2, '0'),
            seconds: time.getSeconds().toString().padStart(2, '0'),
            milliseconds: time.getMilliseconds().toString().padStart(3, '0'),
        },
        setTime,
    };
}