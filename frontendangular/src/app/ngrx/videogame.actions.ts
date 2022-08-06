import { createAction, props } from '@ngrx/store';
import { VideogameData } from '../models/types';

export const gettingVideogames = createAction('[GET] Getting Videogames');
export const gotVideogames = createAction(
  '[GET] Got Videogames',
  props<{ videogames: VideogameData[] }>()
);

export const gettingVideogame = createAction('[GET] Getting Videogame');
export const gotVideogame = createAction(
  '[GET] Got Videogame',
  props<{ videogame: VideogameData }>()
);

export const searchingVideogames = createAction('[GET] Searching Videogames');
export const searchedVideogames = createAction(
  '[GET] Searched Videogames',
  props<{ videogames: VideogameData[] }>()
);

export const addingVideogame = createAction('[POST] Adding Videogame');
export const addedVideogame = createAction(
  '[POST] Added Videogame',
  props<{ videogame: VideogameData }>()
);

export const submitting = createAction('[POST] Submitting');
export const successfullySubmitted = createAction(
  '[POST] Successfully Submitted'
);
export const submittingFailed = createAction('[POST] Submitting Failed');

export const deletingVideogame = createAction('[DELETE] Deleting Videogame');
export const deletedVideogame = createAction(
  '[DELETE] Deleted Videogame',
  props<{ id: number }>()
);

export const changingSort = createAction(
  '[SORTING] Changing Sort',
  props<{ sort: string }>()
);

export const gettingSimilarGames = createAction('[GET] Getting Similar Games');
export const gotSimilarGames = createAction(
  '[GET] Got Similar Games',
  props<{ similarGames: VideogameData[] }>()
);
