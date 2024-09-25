export interface AuthState {
  rolid: string | null;
  patientId: number | null;
}

export const initialAuthState: AuthState = {
  rolid: null,
  patientId: null
}
