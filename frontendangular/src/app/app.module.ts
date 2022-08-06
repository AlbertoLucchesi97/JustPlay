import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AddVideogamePageComponent } from './components/add-videogame-page/add-videogame-page.component';
import { EditVideogamePageComponent } from './components/edit-videogame-page/edit-videogame-page.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './components/sign-out-page/sign-out-page.component';
import { VideogameComponent } from './components/videogame/videogame.component';
import { VideogamePageComponent } from './components/videogame-page/videogame-page.component';
import { VideogamesListComponent } from './components/videogames-list/videogames-list.component';
import { AuthLoginButtonComponent } from './components/auth-login-button/auth-login-button.component';
import { AuthLogoutButtonComponent } from './components/auth-logout-button/auth-logout-button.component';
import { StoreModule } from '@ngrx/store';
import { videogamesReducer } from './ngrx/videogames.reducer';
import { authReducer } from './ngrx/auth.reducer';
import { userReducer } from './ngrx/user.reducer';
import { UserDataService } from './services/user-data.service';
import { VideogamesDataService } from './services/videogame-data.service';
import { FormsModule } from '@angular/forms';
import { AppRoutesModule } from './app-routes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AddVideogamePageComponent,
    EditVideogamePageComponent,
    HeaderComponent,
    HomePageComponent,
    NotFoundPageComponent,
    PageTitleComponent,
    ProfilePageComponent,
    SearchPageComponent,
    SignInPageComponent,
    SignOutPageComponent,
    VideogameComponent,
    VideogamePageComponent,
    VideogamesListComponent,
    AuthLoginButtonComponent,
    AuthLogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          `${env.dev.serverUrl}/videogames/*`,
          `${env.dev.serverUrl}/users*`,
        ],
      },
    }),
    StoreModule.forRoot(
      { videogames: videogamesReducer, auth: authReducer, user: userReducer },
      {}
    ),
    AppRoutesModule,
    FontAwesomeModule,
  ],
  providers: [
    VideogamesDataService,
    UserDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
