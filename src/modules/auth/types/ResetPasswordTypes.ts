export interface ResetPasswordRequest {
  token: string; // Token de la url
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
