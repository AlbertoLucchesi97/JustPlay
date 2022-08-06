import { createAction, props } from '@ngrx/store';
import { Auth0User } from '../models/types';

export const creatingAuthState = createAction('[CREATE] Creating Auth State');
export const createdAuthState = createAction('[CREATE] Created Auth State');

export const gettingIsAuthenticated = createAction(
  '[GET] Getting IsAuthenticated'
);
export const gotIsAuthenticated = createAction(
  '[GET] Got IsAuthenticated',
  props<{ isAuthenticated: boolean }>()
);

export const gettingAuthUser = createAction('[GET] Getting Auth User');
export const gotAuthUser = createAction(
  '[GET] Got Auth User',
  props<{ user: Auth0User | undefined }>()
);
