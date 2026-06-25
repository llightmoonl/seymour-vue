export interface Session {
  id: string;
  device: string;
  browser?: string;
  city?: string;
  ip?: string;
  createdAt: string;
  lastActiveAt: string;
  isCurrent: boolean;
}
