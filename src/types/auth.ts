import type { User } from "./user";

export interface Login {
  auth_token?: string;
  otp_required?: boolean;
  otp_expires_at?: string;
  otp_sent_to?: string;
  otp_resend_available_at?: string;
  email?: string;
}

export type Register = User;
