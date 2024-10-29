import { useEffect, useState } from "react";
import { initializeAdminPusher, unsubscribeAdminPusher } from "../utils/adminNotifications/pusher";

interface Notification {
    _id: string;
    message: string;
    read: boolean;
    createdAt: string;
}
export const useAdminNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const handleNewNotification = (notification: Notification) => {
            setNotifications((prev) => [...prev, notification]);
        };

        const channel = initializeAdminPusher(handleNewNotification);

        return () => unsubscribeAdminPusher(channel);
    }, []);

    const unreadCount = notifications.filter(notification => !notification.read).length;

    return { notifications, unreadCount };
};
