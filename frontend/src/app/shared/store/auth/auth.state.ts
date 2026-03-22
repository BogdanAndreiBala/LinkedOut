import { User } from '../../models/user.model';

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAuthInitialized: false,
};
