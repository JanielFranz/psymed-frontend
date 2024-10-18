import { createAction, props } from '@ngrx/store';

export const setRole = createAction(
  '[Auth] Set Role',
  props<{ rolId: string }>()
)

export const setPatientId = createAction(
  '[Auth] Set Patient ID',
  props<{ patientId: number }>()
)

export const setProfessionalId = createAction(  // New action for professionalId
  '[Auth] Set Professional ID',
  props<{ professionalId: number }>()
)
export const reset = createAction(
  '[Auth] Reset'
);
