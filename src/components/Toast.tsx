import { XMarkIcon } from "@heroicons/react/24/solid";
import { classNames } from "../utils/classNames";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={classNames(
        "toast",
        type === "success" ? "toast-success" : "toast-error",
      )}
    >
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          aria-label="Close notification"
          onClick={onClose}
          className="toast-close-button"
        >
          <XMarkIcon className="size-5" />
        </button>
      )}
    </div>
  );
}
