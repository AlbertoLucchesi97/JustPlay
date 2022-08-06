import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVideogamePageComponent } from './components/add-videogame-page/add-videogame-page.component';
import { EditVideogamePageComponent } from './components/edit-videogame-page/edit-videogame-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './components/sign-out-page/sign-out-page.component';
import { VideogamePageComponent } from './components/videogame-page/videogame-page.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'videogames/search', component: SearchPageComponent },
  {
    path: 'videogames/add',
    component: AddVideogamePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signin', component: SignInPageComponent },
  { path: 'signin-callback', component: SignInPageComponent },
  { path: 'signout', component: SignOutPageComponent },
  { path: 'signout-callback', component: SignOutPageComponent },
  { path: 'videogames/:id', component: VideogamePageComponent },
  {
    path: 'edit/:id',
    component: EditVideogamePageComponent,
    canActivate: [AuthGuard],
  },
  { path: '*', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
