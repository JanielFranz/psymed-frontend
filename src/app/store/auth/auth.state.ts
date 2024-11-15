export interface AuthState {
  rolId: string | null;
  profileId: number | null;
  jwtToken: string | null;
}

export const initialAuthState: AuthState = {
  rolId: null,
  profileId: null,
  jwtToken: null  // Initialize professionalId
}
