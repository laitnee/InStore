import { Role } from './../models/role.enum';

export interface IAuthProvider {
  email: string;
  password: string;
}
export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IserverAuthResponse {
   accessToken: string;
}


