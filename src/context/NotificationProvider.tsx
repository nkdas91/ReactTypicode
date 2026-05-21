import { useEffect, useState, type ReactNode } from "react";
import Toast from "../components/Toast";
import type { NotificationType } from "../types/Notification";
import { NotificationContext } from "./NotificationContext";

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (
    message: string,
    type: NotificationType = "success",
  ) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
}
