export type ITimerCategory =
  | "birthday"
  | "deadline"
  | "launch"
  | "holiday"
  | "anniversary"
  | "other";

export interface ICountdownTimer {
  id: string;
  name: string;
  targetDate: string; // ISO string
  description?: string;
  category: ITimerCategory;
  createdAt: string; // ISO string
  color: string; // hex or tailwind color key
}

export interface ITimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

export type IUrgencyLevel = "distant" | "upcoming" | "imminent" | "past";

export const CATEGORY_CONFIG: Record<
  ITimerCategory,
  { label: string; emoji: string }
> = {
  birthday: { label: "Birthday", emoji: "🎂" },
  deadline: { label: "Deadline", emoji: "⏰" },
  launch: { label: "Launch", emoji: "🚀" },
  holiday: { label: "Holiday", emoji: "🎉" },
  anniversary: { label: "Anniversary", emoji: "💍" },
  other: { label: "Other", emoji: "📅" },
};

export const TIMER_COLORS = [
  { name: "Violet", value: "violet" },
  { name: "Cyan", value: "cyan" },
  { name: "Rose", value: "rose" },
  { name: "Amber", value: "amber" },
  { name: "Emerald", value: "emerald" },
  { name: "Sky", value: "sky" },
  { name: "Fuchsia", value: "fuchsia" },
  { name: "Orange", value: "orange" },
] as const;

export type TimerColor = (typeof TIMER_COLORS)[number]["value"];
