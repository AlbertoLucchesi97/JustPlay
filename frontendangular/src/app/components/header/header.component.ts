import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}
  criteria: string = ''; //searchParams di React come è in Angular
  loading: boolean = false;

  ngOnInit(): void {}
}
