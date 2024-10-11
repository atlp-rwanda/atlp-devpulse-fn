import { useEffect, useState } from "react";
import { initializePusher, unsubscribePusher } from "./pusher";
import { Notification } from "./types";
import { Channel } from "pusher-js";

export const usePusherNotifications = (
    userId: string | null,
    addNotification: (notification: Notification) => void
) => {
    const [channel, setChannel] = useState<Channel | null>(null);

    useEffect(() => {
        if (userId) {
            const pusherChannel = initializePusher(userId, addNotification);
            setChannel(pusherChannel);
        }

        return () => unsubscribePusher(channel);
    }, [userId]);

    return channel;
};
