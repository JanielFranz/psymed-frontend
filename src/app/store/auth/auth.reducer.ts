import { createReducer, on } from '@ngrx/store';
import { setRole } from './auth.actions';
import { AuthState, initialAuthState } from "./auth.state";

export const authReducer = createReducer(
  initialAuthState,
  on(setRole, (state, { rolid }) => ({
    ...state,
    rolid
  }))
)
