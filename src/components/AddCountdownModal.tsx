import { useState } from "react";
import type { ICountdownTimer, ITimerCategory } from "../types/interface";
import { CATEGORY_CONFIG } from "../types/interface";
import { X, Calendar, Tag, AlignLeft, Type } from "lucide-react";
import { ConvertLocalDateTimeString } from "../utils/helpers";
import { showSuccessToast } from "../utils/toast";

interface IAddTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (timer: Omit<ICountdownTimer, "id" | "createdAt">) => void;
  editingTimer?: ICountdownTimer | null;
  formKey: number;
}

function buildInitialForm(editingTimer?: ICountdownTimer | null) {
  if (editingTimer) {
    return {
      name: editingTimer.name,
      targetDate: ConvertLocalDateTimeString(editingTimer.targetDate),
      description: editingTimer.description ?? "",
      category: editingTimer.category,
      color: editingTimer.color,
    };
  }
  return {
    name: "",
    targetDate: ConvertLocalDateTimeString(),
    description: "",
    category: "other" as ITimerCategory,
    color: "violet",
  };
}

function ModalForm({
  editingTimer,
  onClose,
  onSave,
}: Pick<IAddTimerModalProps, "editingTimer" | "onClose" | "onSave">) {
  const [form, setForm] = useState(() => buildInitialForm(editingTimer));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Event name is required";
    if (!form.targetDate) newErrors.targetDate = "Date and time is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave({
      name: form.name.trim(),
      targetDate: new Date(form.targetDate).toISOString(),
      description: form.description.trim() || undefined,
      category: form.category,
      color: form.color,
    });

    editingTimer
      ? showSuccessToast("Countdown Edited Succesfully!")
      : showSuccessToast("Countdown Added Successfully!");

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2418] uppercase tracking-wider mb-1.5">
          <Type size={11} />
          Event Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm((form) => ({ ...form, name: e.target.value }))
          }
          placeholder="e.g. Stanley's Birthday"
          className={`w-full bg-gray-300 text-slate-800  placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm ring-1 outline-none transition-all focus:ring-[#2C2420] focus:text-slate-700  ${
            errors.name ? "ring-rose-500/60" : "ring-white/10"
          }`}
        />
        {errors.name && (
          <p className="text-rose-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2418] uppercase tracking-wider mb-1.5">
          <Calendar size={11} />
          Date & Time
        </label>
        <input
          type="datetime-local"
          value={form.targetDate}
          onChange={(e) =>
            setForm((form) => ({ ...form, targetDate: e.target.value }))
          }
          className={`w-full bg-gray-300 text-slate-800 border-[#F5EEE4] rounded-xl px-4 py-2.5 text-sm ring-1 outline-none transition-all focus:ring-[#2C2420] focus:text-slate-700 [color-scheme:dark] ${
            errors.targetDate ? "ring-rose-500/60" : "ring-white/10"
          }`}
        />
        {errors.targetDate && (
          <p className="text-rose-400 text-xs mt-1">{errors.targetDate}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2418] uppercase tracking-wider mb-1.5">
          <AlignLeft size={11} />
          Description
          <span className=" text-[#2C2418] normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((form) => ({ ...form, description: e.target.value }))
          }
          placeholder="Add a note about this event..."
          rows={2}
          className="w-full bg-gray-300 text-slate-800 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm ring-1 ring-white/10 outline-none transition-all focus:ring-[#2C2420] focus:text-slate-700 resize-none"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2418] uppercase tracking-wider mb-1.5">
          <Tag size={11} />
          Category
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            Object.entries(CATEGORY_CONFIG) as [
              ITimerCategory,
              { label: string; emoji: string },
            ][]
          ).map(([key, { label, emoji }]) => (
            <button
              key={key}
              type="button"
              onClick={() => setForm((form) => ({ ...form, category: key }))}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ring-1 ${
                form.category === key
                  ? "bg-[#5c7a4a] ring-[#a5c89a] text-slate-200"
                  : " bg-gray-300 cursor-pointer ring-white/10 text-slate-500 hover:text-slate-700 hover:ring-[#2C2420] "
              }`}
            >
              {/* [#5f3119] */}
              <span>{emoji}</span>
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl cursor-pointer hover:bg-gray-400 bg-gray-300 text-slate-700 hover:text-white text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl bg-[#a46240] hover:bg-[#65341c] cursor-pointer text-white text-sm font-semibold"
        >
          {editingTimer ? "Save Changes" : "Create Timer"}
        </button>
      </div>
    </form>
  );
}

export function AddCountdownTimerModal({
  isOpen,
  onClose,
  onSave,
  editingTimer,
  formKey,
}: IAddTimerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md  bg-[#efefee] rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <div className="h-1 w-full" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[#8B4A2A] font-bold text-xl">
                {editingTimer ? "Edit Timer" : "New Countdown"}
              </h2>
              <p className="text-[#2C2418] text-sm mt-0.5">
                {editingTimer
                  ? "Update your event details"
                  : "Track something important"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-300 text-slate-400 cursor-pointer  hover:text-white hover:border-gray-500 hover:bg-gray-500
"
            >
              <X size={18} />
            </button>
          </div>
          <ModalForm
            key={formKey}
            editingTimer={editingTimer}
            onClose={onClose}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
}
