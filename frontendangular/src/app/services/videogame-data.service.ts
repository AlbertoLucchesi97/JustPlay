import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostVideogameData, VideogameData } from '../models/types';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideogamesDataService {
  constructor(private http: HttpClient) {}

  getVideogame(id: number) {
    let result = this.http.get<VideogameData>(
      `${env.dev.serverUrl}/videogames/${id}`
    );
    return result;
  }

  getVideogames() {
    return this.http.get<VideogameData[]>(`${env.dev.serverUrl}/videogames`);
  }

  getVideogamesSorted(criteria: string) {
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/videogames?sort=${criteria}`
    );
  }

  getSearchedVideogames(criteria: string) {
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/videogames?search=${criteria}`
    );
  }

  postVideogame(videogame: PostVideogameData) {
    return this.http.post(`${env.dev.serverUrl}/videogames`, videogame, {
      observe: 'response',
    });
  }

  putVideogame(id: number, vgUpdated: PostVideogameData) {
    this.http.put(`${env.dev.serverUrl}/videogames/${id}`, vgUpdated);
  }

  deleteVideogame(id: number) {
    this.http.delete(`${env.dev.serverUrl}/videogames/${id}`);
  }
}
