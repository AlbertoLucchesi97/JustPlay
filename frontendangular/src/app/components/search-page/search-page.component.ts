import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideogameData, VideogamesState } from 'src/app/models/types';
import {
  searchedVideogames,
  searchedVideogamesFail,
  searchingVideogames,
} from 'src/app/ngrx/videogame.actions';
import { VideogamesDataService } from 'src/app/services/videogame-data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['../../../styles.css'],
})
export class SearchPageComponent implements OnInit {
  
  search!: string | null;
  videogames!: VideogameData[];
  videogamesState!: Observable<VideogamesState>;

  constructor(
    private store: Store<{ videogames: VideogamesState }>,
    private videogamesService: VideogamesDataService,
    private route: ActivatedRoute
  ) {
    this.videogamesState = this.store.select('videogames');
    this.videogamesState.subscribe(
      (state) => (this.videogames = state.searched)
    );
    this.route.queryParams.subscribe((params) => {
      this.search = params['criteria'];
      this.searchVideogames();
    });
  }

  ngOnInit(): void {
  }

  searchVideogames() {
    this.store.dispatch(searchingVideogames());
    if (this.search != null) {
      this.videogamesService
        .getSearchedVideogames(this.search)
        .subscribe((response) => {
          if (response.body != null && response.status == HttpStatusCode.Ok) {
            this.store.dispatch(
              searchedVideogames({ videogames: response.body })
            );
          } else {
            const emptyList : VideogameData[] = [];
            this.store.dispatch(searchedVideogamesFail({videogames: emptyList}));
          }
        });
    }
  }
}
