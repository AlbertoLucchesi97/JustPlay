import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostVideogameData, VideogamesState } from 'src/app/models/types';
import {
  submitting,
  successfullySubmitted,
  submittingFailed,
} from 'src/app/ngrx/videogame.actions';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';

@Component({
  selector: 'app-add-videogame-page',
  templateUrl: './add-videogame-page.component.html',
  styleUrls: ['../../../styles.css'],
})
export class AddVideogamePageComponent implements OnInit {
  videogame: PostVideogameData;
  videogameState?: Observable<VideogamesState>;
  isSubmitting?: boolean;

  constructor(
    private store: Store<{ videogames: VideogamesState }>,
    private videogameService: VideogamesDataService,
    private router: Router
  ) {
    this.videogame = {
      title: '',
      releaseDate: new Date(),
      genre: '',
      softwareHouse: '',
      publisher: '',
      synopsis: '',
      cover: '',
      trailer: '',
    };
    this.videogameState = this.store.select('videogames');
    this.videogameState.subscribe(
      (state) => (this.isSubmitting = state.submitting)
    );
  }

  ngOnInit(): void {}

  submitForm() {
    this.store.dispatch(submitting());
    this.videogameService
      .postVideogame(this.videogame)
      .subscribe((response) => {
        if (
          response.status == HttpStatusCode.Created ||
          response.status == HttpStatusCode.Ok
        ) {
          this.store.dispatch(successfullySubmitted());
          this.router.navigate(['/']);
        } else {
          this.store.dispatch(submittingFailed());
        }
      });
  }

  checkErrors(): boolean {
    if (this.videogame.title == "" ||
        this.videogame.genre == "" ||
        this.videogame.softwareHouse == "" ||
        this.videogame.publisher == "" ||
        this.videogame.synopsis == "" ||
        this.videogame.synopsis.length < 20 ||
        this.videogame.cover == "" ||
        this.videogame.trailer == "") {
          return true;
        } else {
          return false;
        };
  }
}
