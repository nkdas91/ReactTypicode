import { createContext } from "react";
import type { NotificationType } from "../types/Notification";

/**
 * Notification context contract.
 */
interface NotificationContextType {
  /**
   * Displays a notification message.
   *
   * @param {string} message - Notification message to display
   * @param {NotificationType} [type] - Notification type
   */
  showNotification: (message: string, type?: NotificationType) => void;
}

/**
 * React context used for displaying application notifications.
 *
 * The context is initialized with `null` and must be consumed
 * within a NotificationProvider.
 */
export const NotificationContext =
  createContext<NotificationContextType | null>(null);
