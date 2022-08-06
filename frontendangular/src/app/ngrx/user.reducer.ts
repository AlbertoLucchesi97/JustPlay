import { createReducer, on } from '@ngrx/store';
import { UserState } from '../models/types';
import {
  gettingUser,
  gotUser,
  gettingVideogamesOwned,
  gotVideogamesOwned,
  gettingVideogamesWishlist,
  gotVideogamesWishlist,
  addingVideogameToOwned,
  addedVideogameToOwned,
  addingVideogameToWishlist,
  addedVideogameToWishlist,
  removingVideogameFromOwned,
  removedVideogameFromOwned,
  removingVideogameFromWishlist,
  removedVideogameFromWishlist,
} from './user.actions';

export const initialUserState: UserState = {
  loading: false,
  user: null,
  videogamesOwned: [],
  videogamesWishlist: [],
};

export const userReducer = createReducer(
  initialUserState,
  on(gettingUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(gotUser, (state, { user }) => ({
    ...state,
    loading: false,
    user: user,
  })),
  on(gettingVideogamesOwned, (state) => ({
    ...state,
    loading: true,
  })),
  on(gotVideogamesOwned, (state, { videogames }) => ({
    ...state,
    loading: false,
    videogamesOwned: videogames,
  })),
  on(gettingVideogamesWishlist, (state) => ({
    ...state,
    loading: true,
  })),
  on(gotVideogamesWishlist, (state, { videogames }) => ({
    ...state,
    loading: false,
    videogamesWishlist: videogames,
  })),
  on(addingVideogameToOwned, (state) => ({
    ...state,
    loading: true,
  })),
  on(addedVideogameToOwned, (state, { videogame }) => ({
    ...state,
    loading: false,
    videogamesOwned: [...state.videogamesOwned, videogame],
  })),
  on(addingVideogameToWishlist, (state) => ({
    ...state,
    loading: true,
  })),
  on(addedVideogameToWishlist, (state, { videogame }) => ({
    ...state,
    loading: false,
    videogamesWishlist: [...state.videogamesWishlist, videogame],
  })),
  on(removingVideogameFromOwned, (state) => ({
    ...state,
    loading: true,
  })),
  on(removedVideogameFromOwned, (state, { id }) => ({
    ...state,
    loading: false,
    videogamesOwned: state.videogamesOwned.filter((vg) => vg.id !== id),
  })),
  on(removingVideogameFromWishlist, (state) => ({
    ...state,
    loading: true,
  })),
  on(removedVideogameFromWishlist, (state, { id }) => ({
    ...state,
    loading: false,
    videogamesWishlist: state.videogamesOwned.filter((vg) => vg.id !== id),
  }))
);
