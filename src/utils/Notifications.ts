// Function to fetch notifications
export const fetchNotifications = async (userId: string): Promise<any[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        query GetNotifications($userId: ID!) {
          getNotifications(userId: $userId) {
            id
            message
            read
            createdAt
          }
        }
      `,
            variables: { userId },
        }),
    });

    const result = await response.json();
    if (result.data) {
        return result.data.getNotifications;
    }
    throw new Error("Failed to fetch notifications");
};

// Function to update notification status
export const updateNotificationStatus = async (id: string, read: boolean) => {
    const response = await fetch(`${process.env.BACKEND_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        mutation MarkNotificationAsRead($id: ID!, $read: Boolean!) {
          markNotificationAsRead(id: $id, read: $read) {
            id
            read
          }
        }
      `,
            variables: { id, read },
        }),
    });

    const result = await response.json();
    if (!result.data.markNotificationAsRead.read) {
        throw new Error("Failed to mark notification as read");
    }
};
