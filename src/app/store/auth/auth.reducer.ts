import { createReducer, on } from '@ngrx/store';
import {setRole, reset, setProfileId, setJwtToken} from './auth.actions'; // Import the new action
import {initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(setRole, (state, { rolId }) => ({
    ...state,
    rolId
  })),
  on(setProfileId, (state, { profileId }) => ({
    ...state,
    profileId
  })),
  on(setJwtToken, (state, { jwtToken }) => ({
    ...state,
    jwtToken
  })),
  on(reset, () => initialAuthState)
);
