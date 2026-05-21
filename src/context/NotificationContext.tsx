import { createContext } from "react";
import type { NotificationType } from "../types/Notification";

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
