import { Plus } from "lucide-react";

interface IHomeProps {
  addTimer: () => void;
}

export function HomeUi({ addTimer }: IHomeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <h2 className="text-[#8B4A2A] font-bold text-2xl mb-2">
        No countdowns yet⏳
      </h2>
      <p className="text-[#2C2418] text-base max-w-xs leading-relaxed mb-8">
        Start tracking what matters <br />
        birthdays, deadlines, launches, and more.
      </p>

      <button
        onClick={addTimer}
        className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-2xl bg-[#5C7A4A] text-white font-semibold text-sm transition-all shadow-lg  hover:shadow-[#a7c197] hover:scale-105 active:scale-95"
      >
        <Plus size={18} />
        Create your first countdown
      </button>
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {[
          "🎂 Birthdays",
          "🚀 Launches",
          "⏰ Deadlines",
          "🎉 Holidays",
          "💍 Anniversaries",
        ].map((hint) => (
          <span
            key={hint}
            className="px-4 py-2 rounded-full bg-gray-300 ring-1 ring-white/10 text-slate-700 text-xs font-medium"
          >
            {hint}
          </span>
        ))}
      </div>
    </div>
  );
}
