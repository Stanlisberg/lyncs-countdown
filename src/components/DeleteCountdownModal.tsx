import { Trash2, X } from "lucide-react";

interface IDeleteProps {
  isOpen: boolean;
  timerName: string;
  onHandleConfirm: () => void;
  onHandleCancel: () => void;
}

export function DeleteCountdownModal({
  isOpen,
  timerName,
  onHandleConfirm,
  onHandleCancel,
}: IDeleteProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onHandleCancel()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-[#efefee] rounded-2xl ring-white/10 shadow-2xl overflow-hidden">
        <div className="h-1 w-full" />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEC9B0] ring-[#8B4A2A]  flex items-center justify-center">
                <Trash2 size={18} className="text-[#8B4A2A]" />
              </div>
              <div>
                <h3 className="text-[#8B4A2A] font-bold text-base">
                  Delete Timer
                </h3>
                <p className="text-[#2C2418] text-xs mt-0.5">
                  This cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onHandleCancel}
              className="p-1.5 cursor-pointer rounded-lg bg-gray-400 text-white hover:text-white hover:bg-gray-500"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-slate-700 text-sm mb-6">
            Are you sure you want to delete{" "}
            <span className="text-[#8B4A2A] font-semibold">
              &ldquo;{timerName}&rdquo;
            </span>
            ?
          </p>

          <div className="flex gap-3">
            <button
              onClick={onHandleCancel}
              className="flex-1 py-2.5 cursor-pointer rounded-xl bg-gray-400 hover:bg-gray-500 text-white hover:text-white text-sm font-medium transition-colors ring-1 ring-white/10"
            >
              Cancel
            </button>
            <button
              onClick={onHandleConfirm}
              className="flex-1 py-2.5  cursor-pointer rounded-xl bg-[#a46240] hover:bg-[#65341c] text-white text-sm font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
