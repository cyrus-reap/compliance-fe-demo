export const fetchNotifications = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/notification`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
};

export const createNotification = async (data: {
  webhookUrl: string;
  notificationTypes: string[];
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMPLIANCE_API_URL}/notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-reap-api-key": process.env.NEXT_PUBLIC_COMPLIANCE_API_KEY as string,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Failed to create notification");
  return response.json();
};
