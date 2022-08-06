import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  PostVideogameData,
  VideogameData,
  VideogamesState,
} from 'src/app/models/types';
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
      year: 0,
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

  submitForm(formData: any) {
    this.store.dispatch(submitting());
    let response: any;
    this.videogameService
      .postVideogame({
        title: formData.title,
        year: formData.year,
        genre: formData.genre,
        softwareHouse: formData.softwareHouse,
        publisher: formData.publisher,
        synopsis: formData.synopsis,
        cover: formData.cover,
        trailer: formData.trailer,
      })
      .subscribe((data) => (response = data.status));
    if ((response = 201)) {
      this.store.dispatch(successfullySubmitted());
      this.router.navigate(['/']);
    } else {
      this.store.dispatch(submittingFailed());
    }
  }
}
