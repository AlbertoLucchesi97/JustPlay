import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData, VideogameData } from '../models/types';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<UserData>(`${env.dev.serverUrl}/users`, {
      observe: 'response',
    });
  }

  getVideogamesOwned() {
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/users/videogamesOwned`,
      { observe: 'response' }
    );
  }

  getVideogamesWishlist() {
    9;
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/users/videogamesWishlist`,
      { observe: 'response' }
    );
  }

  addVideogameToOwned(videogameId: number) {
    return this.http.post(
      `${env.dev.serverUrl}/users/videogamesOwned/add/${videogameId}`,
      null,
      {
        observe: 'response',
      }
    );
  }

  addVideogameToWishlist(videogameId: number) {
    return this.http.post(
      `${env.dev.serverUrl}/users/videogamesWishlist/add/${videogameId}`,
      null,
      {
        observe: 'response',
      }
    );
  }

  removeVideogameFromOwned(id: number) {
    return this.http.delete(
      `${env.dev.serverUrl}/users/videogamesOwned/remove/${id}`,
      {
        observe: 'response',
      }
    );
  }

  removeVideogameFromWishlist(id: number) {
    return this.http.delete(
      `${env.dev.serverUrl}/users/videogamesWishlist/remove/${id}`,
      {
        observe: 'response',
      }
    );
  }
}
