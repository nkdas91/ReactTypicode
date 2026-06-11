import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

/**
 * Hook for accessing the notification context.
 *
 * Must be used within a NotificationProvider.
 *
 * @returns {NotificationContextType}
 * Notification context containing notification actions
 * @throws {Error} If used outside a NotificationProvider
 */
export default function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
}
