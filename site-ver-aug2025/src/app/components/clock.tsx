import React, { useState, useEffect } from "react";

export const Clock = () => {
  const [date, setDate] = useState<Date>(new Date());

  const getTimezone = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    const timezoneName = parts.find(part => part.type === 'timeZoneName');
    return timezoneName ? timezoneName.value : '';
  };

  const getTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  };

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="time">
      <p>{getTime(date).toLocaleUpperCase()}&nbsp;{getTimezone(date)}</p>
    </div>
  );
};

export default Clock;
