import { useState, useCallback, useEffect } from "react";
import type { ICountdownTimer } from "../types/interface";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Plus, Timer, SortAsc } from "lucide-react";
import { showErrorToast } from "../utils/toast";
import { HomeUi } from "../components/HomeUi";
import { CountdownCard } from "../components/CountdownCard";
import { AddCountdownTimerModal } from "../components/AddCountdownModal";
import { DeleteCountdownModal } from "../components/DeleteCountdownModal";

type SortOption = "created" | "date" | "name";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const HomePage = () => {
  const [timers, setTimers] = useLocalStorage<ICountdownTimer[]>(
    "countdown-timers",
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTimer, setEditingTimer] = useState<ICountdownTimer | null>(
    null,
  );
  const [deletingTimer, setDeletingTimer] = useState<ICountdownTimer | null>(
    null,
  );
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [formKey, setFormKey] = useState(0);
  const [now, setNow] = useState<number>(() => new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTimer = useCallback(
    (data: Omit<ICountdownTimer, "id" | "createdAt">) => {
      const newTimer: ICountdownTimer = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setTimers((prev) => [...prev, newTimer]);
    },
    [setTimers],
  );

  const handleEditTimer = useCallback(
    (data: Omit<ICountdownTimer, "id" | "createdAt">) => {
      if (!editingTimer) return;
      setTimers((prev) =>
        prev.map((item) =>
          item.id === editingTimer.id ? { ...item, ...data } : item,
        ),
      );
    },
    [editingTimer, setTimers],
  );

  const onHandleDelete = () => {
    if (!deletingTimer) return;
    setTimers((prev) => prev.filter((t) => t.id !== deletingTimer.id));
    setDeletingTimer(null);
    showErrorToast("Countdown Deleted!");
  };

  const openEdit = useCallback((timer: ICountdownTimer) => {
    setEditingTimer(timer);
    setFormKey((k) => k + 1);
    setIsModalOpen(true);
  }, []);

  const openDelete = useCallback(
    (id: string) => {
      const timer = timers.find((t) => t.id === id);
      if (timer) setDeletingTimer(timer);
    },
    [timers],
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTimer(null);
  };

  const openAdd = () => {
    setEditingTimer(null);
    setFormKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const sortedTimers = [...timers].sort((a, b) => {
    if (sortBy === "date") {
      return (
        new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
      );
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const upcomingCount = timers.filter(
    (t) => new Date(t.targetDate).getTime() > now,
  ).length;

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-1/2 -translate-x-1/2  bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-[#5C7A4A] flex items-center justify-center shadow-lg">
                  <Timer size={16} className="text-white" />
                </div>
                <div className="text-[#8B4A2A] font-bold text-3xl tracking-tight">
                  Lyncs Countdown
                </div>
              </div>
              <p className="text-[#2C2418] text-sm">
                {timers.length === 0
                  ? "Track your most important moments"
                  : `${upcomingCount} upcoming · ${timers.length - upcomingCount} passed`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {timers.length > 0 && (
                <div className="flex items-center gap-1.5 bg-slate-500/70 ring-1 ring-white/10 rounded-xl px-3 py-2">
                  <SortAsc size={13} className="text-white" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-transparent text-slate-300 text-xs font-medium outline-none cursor-pointer"
                  >
                    <option value="date">Filter By Date</option>
                    <option value="name">Filter By Name</option>
                    <option value="created">Recently Added</option>
                  </select>
                </div>
              )}

              <button
                onClick={openAdd}
                className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl bg-[#5C7A4A] text-white text-sm font-semibold hover:scale-105 active:scale-95"
              >
                <Plus size={16} />
                <span>Add Timer</span>
              </button>
            </div>
          </div>
        </header>
        {timers.length === 0 ? (
          <HomeUi addTimer={openAdd} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTimers.map((timer) => (
              <CountdownCard
                key={timer.id}
                timer={timer}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        )}
      </div>

      <AddCountdownTimerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={editingTimer ? handleEditTimer : handleAddTimer}
        editingTimer={editingTimer}
        formKey={formKey}
      />

      <DeleteCountdownModal
        isOpen={!!deletingTimer}
        timerName={deletingTimer?.name ?? ""}
        onHandleConfirm={onHandleDelete}
        onHandleCancel={() => setDeletingTimer(null)}
      />
    </div>
  );
};

export default HomePage;
