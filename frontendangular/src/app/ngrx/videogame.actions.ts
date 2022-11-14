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
export const searchedVideogamesFail = createAction(
  '[GET] Searched Videogames Fail',
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

export const settingNewGames = createAction(
  '[GET] Setting New Games',
  props<{ newGames: VideogameData[] }>());

export const settingGdrGames = createAction(
  '[GET] Setting Gdr Games',
  props<{ gdrGames: VideogameData[] }>());

export const settingFpsGames = createAction(
  '[GET] Setting Fps Games',
  props<{ fpsGames: VideogameData[] }>());

export const settingOpenWorldGames = createAction(
  '[GET] Setting Open World Games',
  props<{ openWorldGames: VideogameData[] }>());

export const settingRacingGames = createAction(
  '[GET] Setting Racing Games',
  props<{ racingGames: VideogameData[] }>());

export const settingAdventureGames = createAction(
  '[GET] Setting Adventure Games',
  props<{ adventureGames: VideogameData[] }>());

export const settingStealthGames = createAction(
  '[GET] Setting Stealth Games',
  props<{ stealthGames: VideogameData[] }>());

export const settingHorrorGames = createAction(
  '[GET] Setting Horror Games',
  props<{ horrorGames: VideogameData[] }>());