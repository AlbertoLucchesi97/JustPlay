import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { delay, Observable } from 'rxjs';
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
  gettingVideogames,
  gotVideogames,
} from 'src/app/ngrx/videogame.actions';
import { UserDataService } from 'src/app/services/user-data.service';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../../styles.css'],
})
export class HomePageComponent implements OnInit {
  videogamesLoading!: boolean;
  user?: UserData | null;
  videogames!: VideogameData[];
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
        (this.videogames = state['videogames']),
        (this.sort = state.sort)
      )
    );
    this.userState.subscribe((state) => (this.user = state.user));
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$ && !this.user) {
      this.getUser();
      this.getUserWishlistAndOwned();
    }
    this.getVideogames();
  }

  getVideogames() {
    this.store.dispatch(gettingVideogames());
    let videogamesList: VideogameData[] | undefined;
    this.videogamesService
      .getVideogamesSorted(this.sort)
      .subscribe((videogames: VideogameData[]) => {
        videogamesList = videogames;
        this.store.dispatch(gotVideogames({ videogames: videogamesList }));
      });
  }

  getUser() {
    this.store.dispatch(gettingUser());
    let user: UserData | undefined;
    this.userService.getUser().subscribe((userData: UserData) => {
      user = userData;
      this.store.dispatch(gotUser({ user: user }));
    });
  }

  getUserWishlistAndOwned() {
    this.store.dispatch(gettingVideogamesOwned());
    let foundVideogamesOwned: VideogameData[] | undefined;
    this.userService.getVideogamesOwned().subscribe((owned) => {
      foundVideogamesOwned = owned;
      this.store.dispatch(
        gotVideogamesOwned({ videogames: foundVideogamesOwned })
      );
    });
    this.store.dispatch(gettingVideogamesWishlist());
    let foundVideogamesWishlist: VideogameData[] | undefined;
    this.userService.getVideogamesWishlist().subscribe((wishlist) => {
      foundVideogamesWishlist = wishlist;
      this.store.dispatch(
        gotVideogamesWishlist({ videogames: foundVideogamesWishlist })
      );
    });
  }
}
