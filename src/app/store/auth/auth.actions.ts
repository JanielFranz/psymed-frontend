import { createAction, props } from '@ngrx/store';

export const setJwtToken = createAction(
  '[Auth] Set JWT Token',
  props<{ jwtToken: string | null }>() // Allow string or null
);

export const setProfileId = createAction(
  '[Auth] Set Profile ID',
  props<{ profileId: number | null }>() // Allow number or null
);

export const setRole = createAction(
  '[Auth] Set Role',
  props<{ rolId: string | null }>() // Allow string or null
);

export const reset = createAction(
  '[Auth] Reset'
);
