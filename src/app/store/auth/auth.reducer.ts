import { createReducer, on } from '@ngrx/store';
import { setRole, reset, setProfileId, setJwtToken } from './auth.actions'; // Import actions
import { initialAuthState } from './auth.state'; // Import initial state

export const authReducer = createReducer(
  initialAuthState, // Start with the initial state
  on(setRole, (state, { rolId }) => ({
    ...state,
    rolId, // Update role
  })),
  on(setProfileId, (state, { profileId }) => ({
    ...state,
    profileId, // Update profile ID
  })),
  on(setJwtToken, (state, { jwtToken }) => ({
    ...state,
    jwtToken, // Update JWT token
  })),
  on(reset, () => initialAuthState) // Reset state to initial
);
