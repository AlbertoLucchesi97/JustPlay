import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideogamesState } from 'src/app/models/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles.css'],
})
export class HeaderComponent implements OnInit {
  criteria?: string;
  loading!: boolean;
  videogamesState: Observable<VideogamesState>;

  constructor(
    public auth: AuthService,
    private router: Router,
    private store: Store<{ videogames: VideogamesState }>
  ) {
    this.videogamesState = store.select('videogames');
    this.videogamesState.subscribe((state) => (this.loading = state.loading));
  }

  ngOnInit(): void {}

  logChange() {
    console.log(this.criteria);
  }

  submitForm() {
    this.router.navigate(['videogames/search'], {
      queryParams: { criteria: `${this.criteria}` },
    });
  }
}
