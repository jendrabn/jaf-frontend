import type { UserTypes } from "./user";

export interface LoginTypes {
  auth_token?: string;
  otp_required?: boolean;
  otp_expires_at?: string;
  otp_sent_to?: string;
  email?: string;
}

export type RegisterTypes = UserTypes;

export interface LoginReqTypes {
  email?: string;
  password?: string;
}

export interface RegisterReqTypes {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface ForgotPasswordReqTypes {
  email?: string;
}

export interface ResetPasswordReqTypes {
  email?: string;
  token?: string;
  password?: string;
  password_confirmation?: string;
}
