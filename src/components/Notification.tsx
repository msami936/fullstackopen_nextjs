"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  const styles =
    notification.type === "error"
      ? "border-red-600 bg-red-50 text-red-800"
      : "border-green-600 bg-green-50 text-green-800";

  return (
    <div
      data-testid="notification"
      className={`mb-4 rounded-md border-2 px-4 py-3 text-sm font-medium ${styles}`}
      role="status"
    >
      {notification.message}
    </div>
  );
}
