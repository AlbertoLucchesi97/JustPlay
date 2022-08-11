import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostVideogameData, VideogamesState } from 'src/app/models/types';
import {
  gettingVideogame,
  gotVideogame,
  submitting,
  submittingFailed,
  successfullySubmitted,
} from 'src/app/ngrx/videogame.actions';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';

@Component({
  selector: 'app-edit-videogame-page',
  templateUrl: './edit-videogame-page.component.html',
  styleUrls: ['../../../styles.css'],
})
export class EditVideogamePageComponent implements OnInit {
  videogameUpdated!: PostVideogameData | null;
  id?: string | null;
  isSubmitting?: boolean;

  constructor(
    private store: Store<{ videogames: VideogamesState }>,
    private videogameService: VideogamesDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let videogameState = this.store.select('videogames');
    videogameState.subscribe((state) => {
      this.isSubmitting = state.submitting;
    });
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.getVideogame(parseInt(this.id));
    }
  }

  getVideogame(id: number) {
    this.store.dispatch(gettingVideogame());
    this.videogameService.getVideogame(id).subscribe((response) => {
      if (response.body != null && response.status == HttpStatusCode.Ok) {
        this.store.dispatch(gotVideogame({ videogame: response.body })),
          (this.videogameUpdated = {
            title: response.body.title,
            year: response.body.year,
            genre: response.body.genre,
            softwareHouse: response.body.softwareHouse,
            publisher: response.body.publisher,
            synopsis: response.body.synopsis,
            cover: response.body.cover,
            trailer: response.body.trailer,
          });
      } else {
        console.log('Error: impossible to get videogame');
        return;
      }
    });
  }

  submitForm() {
    console.log(this.videogameUpdated);
    this.store.dispatch(submitting());
    if (this.id != null && this.videogameUpdated != undefined) {
      this.videogameService
        .putVideogame(parseInt(this.id), this.videogameUpdated)
        .subscribe((response) => {
          if (
            response.status == HttpStatusCode.Created ||
            response.status == HttpStatusCode.Ok
          ) {
            this.store.dispatch(successfullySubmitted());
            this.router.navigate([`/videogames/${this.id}`]);
          } else {
            console.log('Error: impossible to submit data');
            this.store.dispatch(submittingFailed());
          }
        });
    }
  }
}
