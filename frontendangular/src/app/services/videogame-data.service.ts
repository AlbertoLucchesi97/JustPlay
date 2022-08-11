import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
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
      `${env.dev.serverUrl}/videogames/${id}`,
      { observe: 'response' }
    );
    return result;
  }

  getVideogames() {
    return this.http.get<VideogameData[]>(`${env.dev.serverUrl}/videogames`, {
      observe: 'response',
    });
  }

  getVideogamesSorted(criteria: string) {
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/videogames?sort=${criteria}`,
      { observe: 'response' }
    );
  }

  getSearchedVideogames(criteria: string) {
    return this.http.get<VideogameData[]>(
      `${env.dev.serverUrl}/videogames?search=${criteria}`,
      { observe: 'response' }
    );
  }

  postVideogame(videogame: PostVideogameData) {
    return this.http.post(`${env.dev.serverUrl}/videogames/add`, videogame, {
      observe: 'response',
    });
  }

  putVideogame(id: number, vgUpdated: PostVideogameData) {
    return this.http.put(
      `${env.dev.serverUrl}/videogames/edit/${id}`,
      vgUpdated,
      {
        observe: 'response',
      }
    );
  }

  deleteVideogame(id: number) {
    return this.http.delete(`${env.dev.serverUrl}/videogames/delete/${id}`, {
      observe: 'response',
    });
  }
}
