export interface AuthState {
  rolId: string | null;
  patientId: number | null;
  professionalId: number | null; // Add professionalId here
}

export const initialAuthState: AuthState = {
  rolId: null,
  patientId: null,
  professionalId: null  // Initialize professionalId
}
