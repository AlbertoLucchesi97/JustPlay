import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import {
  UserData,
  UserState,
  VideogameData,
  VideogamesState,
} from 'src/app/models/types';
import {
  deletedVideogame,
  deletingVideogame,
  gettingSimilarGames,
  gettingVideogame,
  gotSimilarGames,
  gotVideogame,
} from 'src/app/ngrx/videogame.actions';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';
import {
  addedVideogameToOwned,
  addedVideogameToWishlist,
  addingVideogameToOwned,
  addingVideogameToWishlist,
  removedVideogameFromOwned,
  removedVideogameFromWishlist,
  removingVideogameFromOwned,
  removingVideogameFromWishlist,
} from 'src/app/ngrx/user.actions';
import { HttpStatusCode } from '@angular/common/http';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-videogame-page',
  templateUrl: './videogame-page.component.html',
  styleUrls: ['../../../styles.css'],
})
export class VideogamePageComponent implements OnInit {
  videogame!: VideogameData;
  videogames!: VideogameData[];
  videogamesWishlist!: VideogameData[];
  videogamesOwned!: VideogameData[];
  isAuthenticated!: boolean;
  user!: UserData | null;
  id!: string | null;
  similarGames!: VideogameData[];

  constructor(
    private route: ActivatedRoute,
    private videogamesService: VideogamesDataService,
    private userService: UserDataService,
    private store: Store<{ videogames: VideogamesState; user: UserState }>,
    private sanitizer: DomSanitizer,
    public auth: AuthService
  ) {
    let videogamesState: Observable<VideogamesState> =
      this.store.select('videogames');
    videogamesState.subscribe(
      (state) => (
        (this.videogames = state.videogames),
        (this.similarGames = state.similarGames)
      )
    );

    let userState: Observable<UserState> = this.store.select('user');
    userState.subscribe(
      (state) => (
        (this.user = state.user),
        (this.videogamesWishlist = state.videogamesWishlist),
        (this.videogamesOwned = state.videogamesOwned)
      )
    );

    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
  }

  ngOnInit(): void {
    this.getVideogameData();
  }

  getVideogameData() {
    this.store.dispatch(gettingVideogame());
    if (this.id != null && this.id != undefined) {
      this.videogamesService
        .getVideogame(parseInt(this.id))
        .subscribe((response) => {
          if (response.body != null && response.status == HttpStatusCode.Ok) {
            (this.videogame = response.body),
              this.store.dispatch(gotVideogame({ videogame: this.videogame })),
              this.getSimilarGames();
          } else {
            console.log('Error: impossible to get videogame data');
            return;
          }
        });
    }
  }

  getSimilarGames() {
    if (this.videogame) {
      this.store.dispatch(gettingSimilarGames());
      const similarGames = this.videogames?.filter(
        (vg) => vg.genre == this.videogame?.genre
      );
      this.store.dispatch(
        gotSimilarGames({
          similarGames: similarGames?.filter(
            ({ id }) => id !== this.videogame?.id
          ),
        })
      );
    }
  }

  isInWishlist(): Observable<boolean> {
    return of(
      this.videogamesWishlist.some((vg) => vg.id === this.videogame.id)
    );
  }
  isInOwned(): Observable<boolean> {
    return of(this.videogamesOwned.some((vg) => vg.id === this.videogame.id));
  }

  getSanitizedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videogame.trailer
    );
  }

  onRemoveVideogameFromWishlist() {
    console.log('on remove videogame from wishlist clicked!');
    this.store.dispatch(removingVideogameFromWishlist());
    if (this.id != null) {
      this.userService
        .removeVideogameFromWishlist(parseInt(this.id))
        .subscribe((response) => {
          if (response.status == HttpStatusCode.Ok && this.id != null) {
            this.store.dispatch(
              removedVideogameFromWishlist({ id: parseInt(this.id) })
            );
          } else {
            console.log('Error: impossible to remove videogame from wishlist');
            return;
          }
        });
    }
  }
  onAddVideogameToWishlist() {
    console.log('on add videogame to wishlist clicked!');
    this.store.dispatch(addingVideogameToWishlist());
    if (this.id != null) {
      this.userService
        .addVideogameToWishlist(parseInt(this.id))
        .subscribe((response) => {
          if (response.status == HttpStatusCode.Created && this.id != null) {
            this.store.dispatch(
              addedVideogameToWishlist({ videogame: this.videogame })
            );
          } else {
            console.log('Error: impossible to add videogame to wishlist');
            return;
          }
        });
    }
  }

  onAddVideogameToOwned() {
    console.log('on add videogame to owned clicked!');
    this.store.dispatch(addingVideogameToOwned());
    if (this.id != null) {
      this.userService
        .addVideogameToOwned(parseInt(this.id))
        .subscribe((response) => {
          if (response.status == HttpStatusCode.Created && this.id != null) {
            this.store.dispatch(
              addedVideogameToOwned({ videogame: this.videogame })
            );
          } else {
            console.log('Error: impossible to add videogame to owned');
            return;
          }
        });
    }
  }
  onRemoveVideogameFromOwned() {
    console.log('on remove videogame from owned clicked!');
    this.store.dispatch(removingVideogameFromOwned());
    if (this.id != null) {
      this.userService
        .removeVideogameFromOwned(parseInt(this.id))
        .subscribe((response) => {
          if (response.status == HttpStatusCode.Ok && this.id != null) {
            this.store.dispatch(
              removedVideogameFromOwned({ id: parseInt(this.id) })
            );
          } else {
            console.log('Error: impossible to remove videogame from owned');
            return;
          }
        });
    }
  }

  submitForm() {
    if (this.id != null) {
      this.store.dispatch(deletingVideogame());
      this.videogamesService
        .deleteVideogame(parseInt(this.id))
        .subscribe((response) => {
          if (response.status == HttpStatusCode.NoContent && this.id != null) {
            this.store.dispatch(deletedVideogame({ id: parseInt(this.id) })),
              (location.href = '/');
          } else {
            console.log('Error: impossible to delete videogame');
            return;
          }
        });
    }
  }
}
