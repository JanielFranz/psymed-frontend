import { createReducer, on } from '@ngrx/store';
import { setJwtToken, setProfileId, setRole } from './auth.actions';

export interface AuthState {
  rolId: string | null;
  profileId: number | null;
  jwtToken: string | null;
}

export const initialAuthState: AuthState = {
  rolId: null,
  profileId: null,
  jwtToken: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(setJwtToken, (state, { jwtToken }) => ({ ...state, jwtToken })),
  on(setProfileId, (state, { profileId }) => ({ ...state, profileId })),
  on(setRole, (state, { rolId }) => ({ ...state, rolId }))
);
