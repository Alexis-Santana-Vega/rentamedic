export interface otpVerificationRequest {
  email: string;
  otp: number;
  purpose: string; // 'PASSWORD_RESET' 'EMAIL_VERIFICATION' 'LOGIN' 'TWO_FACTOR_AUTH'
}

export interface otpVerificationResponse {
  message: string;
  verification: boolean;
}
