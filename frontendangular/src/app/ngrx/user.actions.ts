import { createAction, props } from '@ngrx/store';
import { UserData, VideogameData } from '../models/types';

export const gettingUser = createAction('[GET] Getting User');
export const gotUser = createAction(
  '[GET] Got User',
  props<{ user: UserData | null }>()
);

export const gettingVideogamesOwned = createAction(
  '[GET] Getting Videogames Owned'
);
export const gotVideogamesOwned = createAction(
  '[GET] Got Videogames Owned',
  props<{ videogames: VideogameData[] }>()
);

export const gettingVideogamesWishlist = createAction(
  '[GET] Getting Videogames Wishlist'
);
export const gotVideogamesWishlist = createAction(
  '[GET] Got Videogames Wishlist',
  props<{ videogames: VideogameData[] }>()
);

export const addingVideogameToWishlist = createAction(
  '[POST] Adding Videogame To Wishlist'
);
export const addedVideogameToWishlist = createAction(
  '[POST] Added Videogame To Wishlist',
  props<{ videogame: VideogameData }>()
);

export const addingVideogameToOwned = createAction(
  '[POST] Adding Videogame To Owned'
);
export const addedVideogameToOwned = createAction(
  '[POST] Added Videogame To Owned',
  props<{ videogame: VideogameData }>()
);

export const removingVideogameFromWishlist = createAction(
  '[DELETE] Removing Videogame From Wishlist'
);
export const removedVideogameFromWishlist = createAction(
  '[DELETE] Removed Videogame From Wishlist',
  props<{ id: number }>()
);

export const removingVideogameFromOwned = createAction(
  '[DELETE] Removing Videogame From Owned'
);
export const removedVideogameFromOwned = createAction(
  '[DELETE] Removed Videogame From Owned',
  props<{ id: number }>()
);
