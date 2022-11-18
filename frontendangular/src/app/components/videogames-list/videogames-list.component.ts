import { Component, Input, OnInit } from '@angular/core';
import { VideogameData } from 'src/app/models/types';

@Component({
  selector: 'app-videogames-list',
  templateUrl: './videogames-list.component.html',
  styleUrls: ['../../../styles.css'],
})

export class VideogamesListComponent implements OnInit {
  constructor() {}
  @Input() data!: VideogameData[];

  ngOnInit(): void {}
}
