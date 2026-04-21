export interface UserLightResponse {
  id: string;
  locationId: string | null;
  fullName: string;
  userName: string;
  roles: string[];
  active: boolean;
  locationName?: string | null;
}

export interface UserResponse {
  id: string;
  locationId: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  roles: string[];
  active: boolean;
  mobilePhone: string;
  phoneOffice: string;
  phoneExt: string;
  email: string;
  locationName?: string | null;
}

export interface LocationResponse {
  id: string;
  name: string;
}

export interface UserInitResponse {
  userItems: UserLightResponse[];
  locationItems: LocationResponse[];
}

export interface UserForm {
  id: string;
  locationId: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roles: string[];
  active: boolean;
  mobilePhone: string;
  phoneOffice: string;
  phoneExt: string;
  email: string;
}

export interface PasswordForm {
  oldPassword: string;
  newPassword: string;
}

export interface RoleOption {
  value: string;
  title: string;
}
