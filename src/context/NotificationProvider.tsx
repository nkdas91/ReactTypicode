import { useEffect, useState, type ReactNode } from "react";
import Toast from "../components/Toast";
import { NOTIFICATION_DURATION } from "../constants/api";
import type { NotificationType } from "../types/Notification";
import { NotificationContext } from "./NotificationContext";

/**
 * Notification state stored by the provider.
 */
interface Notification {
  /**
   * Notification message displayed to the user.
   */
  message: string;

  /**
   * Notification type used for styling and semantics.
   */
  type: NotificationType;
}

/**
 * Props for NotificationProvider.
 */
interface NotificationProviderProps {
  /**
   * Child components that will have access to the notification context.
   */
  children: ReactNode;
}

/**
 * Provides notification functionality to the application.
 *
 * Responsibilities:
 * - expose notification actions via React Context
 * - manage notification state
 * - automatically dismiss notifications after a delay
 * - render toast notifications
 *
 * @param {NotificationProviderProps} props - Provider props
 * @returns {JSX.Element} Notification context provider
 */
export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  /**
   * Currently active notification.
   */
  const [notification, setNotification] = useState<Notification | null>(null);

  /**
   * Displays a notification message.
   *
   * @param {string} message - Message to display
   * @param {NotificationType} [type="success"] - Notification type
   */
  const showNotification = (
    message: string,
    type: NotificationType = "success",
  ) => {
    setNotification({ message, type });
  };

  /**
   * Automatically clears notifications after a delay.
   */
  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, NOTIFICATION_DURATION);

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
