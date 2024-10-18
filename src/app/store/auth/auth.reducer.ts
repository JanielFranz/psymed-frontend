import { createReducer, on } from '@ngrx/store';
import {setRole, setPatientId, setProfessionalId, reset} from './auth.actions'; // Import the new action
import {initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(setRole, (state, { rolId }) => ({
    ...state,
    rolId
  })),
  on(setPatientId, (state, { patientId }) => ({
    ...state,
    patientId
  })),
  on(setProfessionalId, (state, { professionalId }) => ({
    ...state,
    professionalId
  })),
  on(reset, () => initialAuthState)
);
