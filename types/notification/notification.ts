export type GetAllNotificationForUserType = {
  channel: string;
  config: object;
  createdAt: Date;
  id: string;
  types: string[];
}[];

export interface NotificationCreateType {
  notificationChannel?: "WEBHOOK";
  notificationTypes?: (
    | "verification_status_change"
    | "feature_access_change"
    | "new_feature"
    | "reminder"
  )[];
  webhookUrl: string;
}
