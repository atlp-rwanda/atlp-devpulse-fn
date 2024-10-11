import Pusher, { Channel } from "pusher-js";
import { Notification } from "./types";

export const initializePusher = (
    userId: string,
    onNewNotification: (notification: Notification) => void
): Channel => {
    const pusher = new Pusher(process.env.PUSHER_KEY!, {
        cluster: process.env.PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`notifications-${userId}`);
    channel.bind("new-notification", onNewNotification);

    return channel;
};

export const unsubscribePusher = (channel: Channel | null) => {
    if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
    }
};
