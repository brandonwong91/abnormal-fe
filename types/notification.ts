export interface NotificationType {
  timestamp: string;
  level: string;
  title: string;
  summary: string;
}

export type DataMap = Map<string, NotificationType[]> | undefined;
