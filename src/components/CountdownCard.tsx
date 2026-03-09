"use client";

import type { ICountdownTimer } from "../types/interface";
import { CATEGORY_CONFIG } from "../types/interface";
import { useCountdown, getUrgencyLevel } from "../hooks/useCountdownTimer";
import { format } from "date-fns";
import { Pencil, Trash2, Clock } from "lucide-react";

interface ICardProps {
  timer: ICountdownTimer;
  onEdit: (timer: ICountdownTimer) => void;
  onDelete: (id: string) => void;
}

const COLOR_OBJ: Record<
  string,
  { bg: string; ring: string; text: string; glow: string; bar: string }
> = {
  cardColor: {
    bg: "from-[#EEC9B0] to-[#efeefe]",
    ring: "ring-[#C8B89A]",
    text: "text-[#8B4A2A]",
    glow: "shadow-[#D4C9B0]",
    bar: "bg-[#8B4A2A]",
  },
};

const URGENCY_BADGE: Record<string, { label: string; classes: string }> = {
  distant: { label: "Upcoming", classes: "bg-[#8B4A2A] text-[efefee]" },
  upcoming: {
    label: "This Week",
    classes: "bg-gray-400 text-gray-700 ring-1 ring-gray-400",
  },
  imminent: {
    label: "Very Soon!",
    classes:
      "bg-rose-500/20 text-rose-500 ring-1 ring-rose-500/40 animate-pulse",
  },
  past: { label: "Passed", classes: "bg-slate-700/40 text-slate-500" },
};

function TimeUnit({
  value,
  label,
  colorText,
}: {
  value: number;
  label: string;
  colorText: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative flex items-center justify-center w-14 h-14 rounded-xl bg-black/15 backdrop-blur-sm ring-1 ring-white/10 ${colorText} font-mono text-2xl font-bold tabular-nums`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
        {label}
      </span>
    </div>
  );
}

export function CountdownCard({ timer, onEdit, onDelete }: ICardProps) {
  const timeRemaining = useCountdown(timer.targetDate);
  const urgency = getUrgencyLevel(timeRemaining);
  const colors = COLOR_OBJ.cardColor;
  const category = CATEGORY_CONFIG[timer.category];
  const badge = URGENCY_BADGE[urgency];

  const formattedDate = format(
    new Date(timer.targetDate),
    "MMM d, yyyy · h:mm a",
  );

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${colors.bg}
        ring-1 ${colors.ring}
        shadow-xl ${colors.glow}
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-2xl
        ${urgency === "past" ? "opacity-60 grayscale" : ""}
      `}
    >
      <div className={`h-1 w-full ${colors.bar} opacity-70`} />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 bg-[#efefee] max-w-[55%] rounded-lg p-1">
              <span className="text-lg leading-none">{category.emoji}</span>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${colors.text} opacity-70`}
              >
                {category.label}
              </span>
            </div>
            <h3 className="text-slate-600 font-bold text-lg leading-tight truncate">
              {timer.name}
            </h3>
            {timer.description && (
              <p className="text-slate-700 text-sm mt-1 line-clamp-2 leading-snug">
                {timer.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 transition-opacity duration-200 shrink-0">
            <button
              onClick={() => onEdit(timer)}
              className="p-1.5 rounded-lg cursor-pointer bg-white/5 hover:bg-[#8B4A2A] text-slate-500 hover:text-white"
              aria-label="Edit timer"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(timer.id)}
              className="p-1.5 rounded-lg cursor-pointer bg-white/5 hover:bg-[#8B4A2A] text-slate-500 hover:text-white"
              aria-label="Delete timer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {timeRemaining.isPast ? (
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <div className="text-4xl mb-1">🎊</div>
              <p className="text-slate-400 text-sm font-medium">
                This event has passed
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2">
            <TimeUnit
              value={timeRemaining.days}
              label="days"
              colorText={colors.text}
            />
            <span
              className={`text-2xl font-bold ${colors.text} opacity-40 mb-4`}
            >
              :
            </span>
            <TimeUnit
              value={timeRemaining.hours}
              label="hrs"
              colorText={colors.text}
            />
            <span
              className={`text-2xl font-bold ${colors.text} opacity-40 mb-4`}
            >
              :
            </span>
            <TimeUnit
              value={timeRemaining.minutes}
              label="min"
              colorText={colors.text}
            />
            <span
              className={`text-2xl font-bold ${colors.text} opacity-40 mb-4`}
            >
              :
            </span>
            <TimeUnit
              value={timeRemaining.seconds}
              label="sec"
              colorText={colors.text}
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Clock size={11} />
            <span>{formattedDate}</span>
          </div>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.classes}`}
          >
            {badge.label}
          </span>
        </div>
      </div>
    </div>
  );
}
