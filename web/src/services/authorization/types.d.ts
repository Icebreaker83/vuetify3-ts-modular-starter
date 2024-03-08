import type { JwtPayload } from 'jwt-decode';

export interface AuthorizationState {
  isAuth: boolean;
  user: {
    login: string;
    name: string;
  };
  expirationDate: number | null;
  lastActivity: number | null;
}

export interface AccessToken extends JwtPayload {
  user_name: string;
}
