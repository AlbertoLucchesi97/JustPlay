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
        (this.sort = state.sort)
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
      .getVideogamesSorted(this.sort)
      .subscribe((response) => {
        if (response.body != null && response.status == HttpStatusCode.Ok) {
          this.store.dispatch(gotVideogames({ videogames: response.body }));
        } else {
          console.log('Error: impossible to get videogames');
          return;
        }
      });
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
