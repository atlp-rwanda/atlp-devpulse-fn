import { Notification } from "./types";

export const fetchNotifications = async (
    userId: string
): Promise<Notification[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query GetNotifications($userId: ID!) {
                getNotifications(userId: $userId) {
                  id
                  message
                  read
                  createdAt
                }
              }`,
            variables: { userId },
        }),
    });

    const result = await response.json();
    return result.data?.getNotifications || [];
};

export const updateNotificationStatus = async (id: string, read: boolean) => {
    const response = await fetch(`${process.env.BACKEND_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation MarkNotificationAsRead($id: ID!, $read: Boolean!) {
                markNotificationAsRead(id: $id, read: $read) {
                  id
                  read
                }
              }`,
            variables: { id, read },
        }),
    });

    const result = await response.json();
    return result.data?.markNotificationAsRead.read;
};
