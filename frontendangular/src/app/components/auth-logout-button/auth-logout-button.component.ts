import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-logout-button',
  templateUrl: './auth-logout-button.component.html',
  styleUrls: ['./auth-logout-button.component.css'],
})
export class AuthLogoutButtonComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
