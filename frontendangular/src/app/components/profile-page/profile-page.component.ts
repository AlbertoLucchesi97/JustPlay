import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserData, UserState, VideogameData } from 'src/app/models/types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['../../../styles.css', 'profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user!: UserData | null;
  videogamesOwned!: VideogameData[];
  videogamesWishlist!: VideogameData[];

  constructor(private store: Store<{ user: UserState }>) {
    let userState = store.select('user');
    userState.subscribe((state) => {
      (this.user = state.user),
        (this.videogamesOwned = state.videogamesOwned),
        (this.videogamesWishlist = state.videogamesWishlist);
    });
  }

  ngOnInit(): void {}
}
