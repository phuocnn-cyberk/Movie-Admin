export interface User {
  userID?: string | number;
  username?: string | null;
  role?: string | null;
  email?: string | null;
  password?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface SupportSubmission {
  supportID: number;
  email: string | null;
  phoneNumber: string;
  message: string;
  createdAt: string;
  respondedAt: string | null;
  respondedByName: string | null;
  response: string | null;
}

export interface SupportReplyPayload {
  supportID: number;
  response: string;
  respondedBy: number;
}