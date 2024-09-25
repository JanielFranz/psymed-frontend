import { createReducer, on } from '@ngrx/store';
import { setRole,setPatientId} from './auth.actions';
import { AuthState, initialAuthState } from "./auth.state";

export const authReducer = createReducer(
  initialAuthState,
  on(setRole, (state, { rolid }) => ({
    ...state,
    rolid
  })),
  on(setPatientId, (state, { patientId }) => ({
    ...state,
    patientId
  }))
)
