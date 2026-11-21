import { useEffect, useState } from "react";
import { HOURS } from "../data/menu";

export interface StoreStatus {
  isOpen: boolean;
  primary: string;
  secondary: string;
  todayIndex: number;
  todayHours: string;
  closingSoon: boolean;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function singaporeNow(): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Singapore",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = WEEKDAY_INDEX[get("weekday")] ?? new Date().getDay();
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));

  return { weekday, minutes: hour * 60 + minute };
}

export function formatClock(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const suffix = hour24 < 12 ? "am" : "pm";
  return minute === 0 ? `${hour12}${suffix}` : `${hour12}:${String(minute).padStart(2, "0")}${suffix}`;
}

export function getStoreStatus(): StoreStatus {
  const { weekday, minutes } = singaporeNow();
  const today = HOURS[weekday];

  if (minutes >= today.open && minutes < today.close) {
    const closingSoon = today.close - minutes <= 20;
    return {
      isOpen: true,
      primary: closingSoon ? "Closing soon" : "Open now",
      secondary: `until ${formatClock(today.close)}`,
      todayIndex: weekday,
      todayHours: today.label,
      closingSoon,
    };
  }

  if (minutes < today.open) {
    return {
      isOpen: false,
      primary: "Closed now",
      secondary: `opens ${formatClock(today.open)} today`,
      todayIndex: weekday,
      todayHours: today.label,
      closingSoon: false,
    };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = HOURS[(weekday + offset) % 7];
    const dayLabel = offset === 1 ? "tomorrow" : next.short;
    if (next) {
      return {
        isOpen: false,
        primary: "Closed now",
        secondary: `opens ${dayLabel} ${formatClock(next.open)}`,
        todayIndex: weekday,
        todayHours: today.label,
        closingSoon: false,
      };
    }
  }

  return {
    isOpen: false,
    primary: "Closed now",
    secondary: `opens ${formatClock(today.open)}`,
    todayIndex: weekday,
    todayHours: today.label,
    closingSoon: false,
  };
}

export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = useState<StoreStatus>(() => getStoreStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getStoreStatus()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
