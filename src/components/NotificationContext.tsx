"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type NotificationType = "success" | "error";

type Notification = {
  message: string;
  type: NotificationType;
};

type NotificationContextValue = {
  notification: Notification | null;
  notify: (message: string, type?: NotificationType) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNotification = useCallback(() => {
    setNotification(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = "success") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setNotification({ message, type });
      timeoutRef.current = setTimeout(() => {
        setNotification(null);
        timeoutRef.current = null;
      }, 5000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({ notification, notify, clearNotification }),
    [notification, notify, clearNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}
