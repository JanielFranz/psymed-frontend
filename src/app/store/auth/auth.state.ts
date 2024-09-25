export interface AuthState {
  rolid: string | null;
  patientId: string | null;
}

export const initialAuthState: AuthState = {
  rolid: null,
  patientId: null
}
