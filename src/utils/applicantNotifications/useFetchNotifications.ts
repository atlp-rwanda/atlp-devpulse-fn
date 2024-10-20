import { useEffect } from "react";
import { Notification } from "./types";
import { fetchNotifications } from "./NotificationService";

export const useFetchNotifications = (
    userId: string | null,
    setNotifications: (notifications: Notification[]) => void,
    setUnreadCount: (count: number) => void
) => {
    useEffect(() => {
        if (userId) {
            fetchAndSetNotifications(userId);
        }
    }, [userId]);

    const fetchAndSetNotifications = async (userId: string) => {
        const fetchedNotifications = await fetchNotifications(userId);
        setNotifications(fetchedNotifications);
        setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);
    };
};
