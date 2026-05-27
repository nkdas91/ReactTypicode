import { XMarkIcon } from "@heroicons/react/24/solid";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        fixed top-5 right-5 z-50
        flex items-center gap-3
        min-w-[320px] max-w-md
        rounded-xl px-4 py-3
        shadow-lg
        border
        transition-all duration-300
        animate-in slide-in-from-right
        ${
          isSuccess
            ? "bg-secondary text-on-secondary border-on-secondary"
            : "bg-danger text-on-danger border-on-danger"
        }
      `}
    >
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          aria-label="Close notification"
          onClick={onClose}
          className="shrink-0 rounded-full p-1 transition hover:bg-white/20 cursor-pointer"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
