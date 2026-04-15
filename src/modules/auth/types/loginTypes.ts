export interface LoginRequest {
  email: string;
  password: string;
  role: 'SYSADMIN' | 'ADMIN' | 'CLIENT';
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    uuid: string;
    fullName: string;
    email: string;
    role: string;
  };
}
