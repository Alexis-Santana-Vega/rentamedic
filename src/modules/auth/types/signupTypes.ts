export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  requiresVerification: boolean;
}
