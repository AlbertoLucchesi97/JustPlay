import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData, VideogameData } from '../models/types';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<UserData>(`${env.dev.serverUrl}/users`);
  }

  getVideogamesOwned() {
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/users/videogamesOwned`
    );
  }

  getVideogamesWishlist() {
    9;
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/users/videogamesWishlist`
    );
  }

  addVideogameToOwned(videogameId: number) {
    this.http.post(
      `${env.dev.serverUrl}/users/videogamesOwned/add/${videogameId}`,
      null
    );
  }

  addVideogameToWishlist(videogameId: number) {
    this.http.post(
      `${env.dev.serverUrl}/users/videogamesWishlist/add/${videogameId}`,
      null
    );
  }

  removeVideogameFromOwned(id: number) {
    this.http.delete(`${env.dev.serverUrl}/users/videogamesOwned/remove/${id}`);
  }

  removeVideogameFromWishlist(id: number) {
    this.http.delete(
      `${env.dev.serverUrl}/users/videogamesWishlist/remove/${id}`
    );
  }
}
