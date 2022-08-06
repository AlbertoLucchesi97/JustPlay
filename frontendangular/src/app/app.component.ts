import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  AppState,
  AuthState,
  UserState,
  VideogamesState,
} from './models/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private store: Store<{
      videogames: VideogamesState;
      user: UserState;
      auth: AuthState;
    }>
  ) {
    let videogameState: Observable<VideogamesState>;
    let loading: boolean;

    videogameState = this.store.select('videogames');
    // videogameState.subscribe((data) => (loading = data.loading));
  }
}
