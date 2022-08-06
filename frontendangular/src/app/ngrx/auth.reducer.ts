import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/types';
import {
  creatingAuthState,
  createdAuthState,
  gettingIsAuthenticated,
  gotIsAuthenticated,
  gettingAuthUser,
  gotAuthUser,
} from './auth.actions';

export const initialAuthState: AuthState = {
  user: undefined,
  loading: false,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(creatingAuthState, (state) => ({
    ...state,
    loading: true,
  })),
  on(createdAuthState, (state) => ({
    ...state,
    loading: false,
  })),
  on(gettingIsAuthenticated, (state) => ({
    ...state,
    loading: true,
  })),
  on(gotIsAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    loading: false,
    isAuthenticated: isAuthenticated,
  })),
  on(gettingAuthUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(gotAuthUser, (state, { user }) => ({
    ...state,
    loading: false,
    user: user,
  }))
);
