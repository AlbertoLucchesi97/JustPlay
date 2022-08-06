import { Component, OnInit } from '@angular/core';
import { UserData, VideogameData } from 'src/app/models/types';

@Component({
  selector: 'app-videogame-page',
  templateUrl: './videogame-page.component.html',
  styleUrls: ['../../../styles.css'],
})
export class VideogamePageComponent implements OnInit {
  videogame?: VideogameData;
  isAuthenticated?: boolean;
  user?: UserData;
  id?: number;
  similarGames!: VideogameData[];

  constructor() {}

  ngOnInit(): void {}

  isInWishlist(videogame: VideogameData): boolean {
    return true;
  }
  isInOwned(videogame: VideogameData): boolean {
    return true;
  }

  onRemoveVideogameFromWishlist() {}
  onAddVideogameToWishlist() {}

  onAddVideogameToOwned() {}
  onRemoveVideogameFromOwned() {}

  submitForm() {}
}
