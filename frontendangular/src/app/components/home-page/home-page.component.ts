import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  UserData,
  UserState,
  VideogameData,
  VideogamesState,
} from 'src/app/models/types';
import {
  gettingUser,
  gettingVideogamesOwned,
  gettingVideogamesWishlist,
  gotUser,
  gotVideogamesOwned,
  gotVideogamesWishlist,
} from 'src/app/ngrx/user.actions';
import {
  changingSort,
  gettingVideogames,
  gotVideogames,
  settingAdventureGames,
  settingFpsGames,
  settingGdrGames,
  settingHorrorGames,
  settingNewGames,
  settingOpenWorldGames,
  settingRacingGames,
  settingStealthGames,
} from 'src/app/ngrx/videogame.actions';
import { UserDataService } from 'src/app/services/user-data.service';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../../styles.css', 'home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  videogamesLoading!: boolean;
  user?: UserData | null;
  videogames!: VideogameData[];
  newGames!: VideogameData[];
  gdrGames!: VideogameData[];
  fpsGames!: VideogameData[];
  openworldGames!: VideogameData[];
  racingGames!: VideogameData[];
  adventureGames!: VideogameData[];
  stealthGames!: VideogameData[];
  horrorGames!: VideogameData[];

  gamesForGenres: Map<String, VideogameData[]> = new Map<String, VideogameData[]>;

  sort: string = 'title';

  userState?: Observable<UserState>;
  videogamesState?: Observable<VideogamesState>;

  options = [
    { value: 'title', label: 'Title' },
    { value: 'year', label: 'Year' },
  ];

  constructor(
    private store: Store<{ videogames: VideogamesState; user: UserState }>,
    private videogamesService: VideogamesDataService,
    private userService: UserDataService,
    private auth: AuthService
  ) {
    this.userState = this.store.select('user');
    this.videogamesState = this.store.select('videogames');
    this.videogamesState.subscribe(
      (state) => (
        (this.videogamesLoading = state.loading),
        (this.videogames = state.videogames),
        (this.sort = state.sort),
        (this.newGames = state.newGames),
        (this.adventureGames = state.adventureGames),
        (this.gdrGames = state.gdrGames),
        (this.fpsGames = state.fpsGames),
        (this.racingGames = state.racingGames),
        (this.openworldGames = state.openworldGames),
        (this.stealthGames = state.stealthGames),
        (this.horrorGames = state.horrorGames)
      )
    );
    this.userState.subscribe((state) => (this.user = state.user));
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$ && !this.user) {
      this.getUser();
      this.getUserOwned();
      this.getUserWishlist();
    }
    this.getVideogames();
  }

  getVideogames() {
    this.store.dispatch(gettingVideogames());
    let videogamesList: VideogameData[] | undefined;
    this.videogamesService
      .getVideogamesSorted("title")
      .subscribe((response) => {
        if (response.body != null && response.status == HttpStatusCode.Ok) {
          this.store.dispatch(gotVideogames({ videogames: response.body }));
          this.categorizeVideogames(response.body);
        } else {
          console.log('Error: impossible to get videogames');
          return;
        }
      });

  }

  categorizeVideogames(videogames : VideogameData[]) {
    let dateNow = new Date();
    let dateNowMinusThirtyDays = new Date();
    dateNowMinusThirtyDays.setDate(dateNow.getDate() - 30);

    this.store.dispatch(settingNewGames({newGames: videogames.filter((vg) => new Date(vg.releaseDate) >= dateNowMinusThirtyDays && new Date(vg.releaseDate) <= dateNow )}));
    this.store.dispatch(settingGdrGames({gdrGames: videogames.filter((vg) => vg.genre == 'GDR')}));
    this.store.dispatch(settingFpsGames({fpsGames: videogames.filter((vg) => vg.genre == 'FPS')}));
    this.store.dispatch(settingOpenWorldGames({openWorldGames: videogames.filter((vg) => vg.genre == 'Open World')}));
    this.store.dispatch(settingRacingGames({ racingGames: videogames.filter((vg) => vg.genre == 'Racing')}));
    this.store.dispatch(settingAdventureGames({ adventureGames: videogames.filter((vg) => vg.genre == 'Adventure')}));
    this.store.dispatch(settingStealthGames({stealthGames: videogames.filter((vg) => vg.genre == 'Stealth')}));
    this.store.dispatch(settingHorrorGames({horrorGames: videogames.filter((vg) => vg.genre == 'Horror')}));
    this.populateGenresList();
  }

  populateGenresList() {
    this.gamesForGenres.set("Adventure", this.adventureGames);
    this.gamesForGenres.set("GDR", this.gdrGames);
    this.gamesForGenres.set("FPS", this.fpsGames);
    this.gamesForGenres.set("Open World", this.openworldGames);
    this.gamesForGenres.set("Racing", this.racingGames);
    this.gamesForGenres.set("Stealth", this.stealthGames);
    this.gamesForGenres.set("Horror", this.horrorGames);
  }

  getUser() {
    this.store.dispatch(gettingUser());
    let user: UserData | undefined;
    this.userService.getUser().subscribe((response) => {
      if (response.body != null && response.status == HttpStatusCode.Ok) {
        this.store.dispatch(gotUser({ user: response.body }));
      } else {
        console.log('Error: impossible to get user');
        return;
      }
    });
  }

  getUserOwned() {
    this.store.dispatch(gettingVideogamesOwned());
    this.userService.getVideogamesOwned().subscribe((response) => {
      if (response.body != null && response.status == HttpStatusCode.Ok) {
        this.store.dispatch(gotVideogamesOwned({ videogames: response.body }));
      } else {
        console.log('Error: impossible to get user owned videogames');
        return;
      }
    });
  }

  getUserWishlist() {
    this.store.dispatch(gettingVideogamesWishlist());
    this.userService.getVideogamesWishlist().subscribe((response) => {
      if (response.body != null && response.status == HttpStatusCode.Ok) {
        this.store.dispatch(
          gotVideogamesWishlist({ videogames: response.body })
        );
      } else {
        console.log('Error: impossible to get user wishlist');
        return;
      }
    });
  }

  changeSort() {
    this.store.dispatch(changingSort({ sort: this.sort }));
    this.getVideogames();
  }
}
