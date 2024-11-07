import Pusher, { Channel } from "pusher-js";

interface Notification {
    _id: string;
    message: string;
    read: boolean;
    createdAt: string;
}
export const initializeAdminPusher = (
    onNewNotification: (notification: Notification) => void
): Channel => {
    const pusher = new Pusher(process.env.PUSHER_KEY!, {
        cluster: process.env.PUSHER_CLUSTER!,
    });

    const adminChannel = pusher.subscribe("admin-notifications");
    adminChannel.bind("new-notification", onNewNotification);

    return adminChannel;
};

export const unsubscribeAdminPusher = (channel: Channel | null) => {
    if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
    }
};
