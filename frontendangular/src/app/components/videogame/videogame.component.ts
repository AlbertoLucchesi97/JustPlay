import { Component, Input, OnInit } from '@angular/core';
import { VideogameData } from 'src/app/models/types';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['../../../styles.css'],
})
export class VideogameComponent implements OnInit {
  @Input() data!: VideogameData;
  isHovering!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
