import { createAction, props } from '@ngrx/store';

export const setRole = createAction(
  '[Auth] Set Role',
  props<{ rolId: string }>()
)

export const setProfileId = createAction(
  '[Auth] Set Patient ID',
  props<{ profileId: number }>()
)

export const setJwtToken = createAction(
  '[Auth] Set Jwt Token',
  props<{ jwtToken: string }>()
)

export const reset = createAction(
  '[Auth] Reset'
);
