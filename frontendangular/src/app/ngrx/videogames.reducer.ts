import { createReducer, on } from '@ngrx/store';
import { VideogamesState } from '../models/types';
import {
  gettingVideogames,
  gotVideogames,
  gettingVideogame,
  gotVideogame,
  searchingVideogames,
  searchedVideogames,
  searchedVideogamesFail,
  addingVideogame,
  addedVideogame,
  submitting,
  successfullySubmitted,
  submittingFailed,
  deletingVideogame,
  deletedVideogame,
  changingSort,
  gettingSimilarGames,
  gotSimilarGames,
  settingNewGames,
  settingAdventureGames,
  settingFpsGames,
  settingGdrGames,
  settingHorrorGames,
  settingOpenWorldGames,
  settingRacingGames,
  settingStealthGames
} from './videogame.actions';

export const initialVideogameState: VideogamesState = {
  loading: false,
  videogames: [],
  viewing: null,
  searched: [],
  added: null,
  submitting: false,
  submitted: false,
  deleted: false,
  sort: '',
  similarGames: [],
  newGames: [],
  gdrGames: [],
  fpsGames: [],
  openworldGames: [],
  racingGames: [],
  adventureGames: [],
  stealthGames: [],
  horrorGames: []
};

export const videogamesReducer = createReducer(
  initialVideogameState,
  on(gettingVideogames, (state) => ({
    ...state,
    videogames: [],
    loading: true,
  })),
  on(gotVideogames, (state, { videogames }) => ({
    ...state,
    videogames: videogames,
    loading: false,
  })),
  on(gettingVideogame, (state) => ({
    ...state,
    viewing: null,
    loading: true,
  })),
  on(gotVideogame, (state, { videogame }) => ({
    ...state,
    viewing: videogame,
    loading: false,
  })),
  on(searchingVideogames, (state) => ({
    ...state,
    searched: [],
    loading: true,
  })),
  on(searchedVideogames, (state, { videogames }) => ({
    ...state,
    searched: videogames,
    loading: false,
  })),
  
  on(searchedVideogamesFail, (state, {videogames}) => ({
    ...state,
    searched: videogames,
    loading: false,
  })),
  on(addingVideogame, (state) => ({
    ...state,
    added: null,
    loading: true,
  })),
  on(addedVideogame, (state, { videogame }) => ({
    ...state,
    added: videogame,
    videogames: [...state.videogames, videogame],
    loading: false,
  })),
  on(submitting, (state) => ({
    ...state,
    submitting: true,
  })),
  on(successfullySubmitted, (state) => ({
    ...state,
    submitting: false,
    submitted: true,
  })),
  on(submittingFailed, (state) => ({
    ...state,
    submitting: false,
    submitted: false,
  })),
  on(deletingVideogame, (state) => ({
    ...state,
    loading: true,
  })),
  on(deletedVideogame, (state, { id }) => ({
    ...state,
    loading: false,
    deleted: true,
    videogames: state.videogames.filter((vg) => vg.id !== id),
  })),
  on(changingSort, (state, { sort }) => ({
    ...state,
    sort: sort,
  })),
  on(gettingSimilarGames, (state) => ({
    ...state,
    loading: true,
  })),
  on(gotSimilarGames, (state, { similarGames }) => ({
    ...state,
    loading: false,
    similarGames: similarGames,
  })),
  on(settingNewGames, (state, { newGames }) => ({
    ...state,
    newGames: newGames,
  })),
  on(settingAdventureGames, (state, {adventureGames}) => ({
    ...state,
    adventureGames: adventureGames
  })),
  on(settingFpsGames, (state, { fpsGames }) => ({
    ...state,
    fpsGames: fpsGames,
  })),
  on(settingGdrGames, (state, { gdrGames }) => ({
    ...state,
    gdrGames: gdrGames,
  })),
  on(settingHorrorGames, (state, { horrorGames }) => ({
    ...state,
    horrorGames: horrorGames,
  })),
  on(settingOpenWorldGames, (state, { openWorldGames }) => ({
    ...state,
    openworldGames: openWorldGames,
  })),
  on(settingRacingGames, (state, { racingGames }) => ({
    ...state,
    racingGames: racingGames,
  })),
  on(settingStealthGames, (state, { stealthGames }) => ({
    ...state,
    stealthGames: stealthGames,
  })),
);
