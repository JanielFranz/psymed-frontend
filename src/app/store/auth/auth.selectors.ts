import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectRolId = createSelector(
  selectAuthState,
  (state: AuthState) => state.rolid
);

export const selectPatientId = createSelector(
  selectAuthState,
  (state: AuthState) => state.patientId
)
