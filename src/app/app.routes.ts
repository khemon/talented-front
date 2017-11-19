import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register';
import { HomeComponent } from './home';
/*import { NoContentComponent } from './no-content';*/
import {LoginComponent} from "./login";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {ListJobsComponent} from "./list-jobs/list-jobs.component";
/*import {ContactComponent} from "./contact/";
import {ProfileComponent} from './profile';
import {TalentWorkerComponent} from "./talent-worker/talent-worker.component";
import {CreateJobComponent} from "./create-job";
import {ListUsersSearchComponent} from "./list-users-search/list-users-search.component";

import {JobComponent} from "./job/job.component";*/


export const ROUTES: Routes = [
  { path: 'register-user', component: RegisterComponent} ,
  { path: '',      component: HomeComponent},
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'list-jobs', component: ListJobsComponent}, // TODO: ajouter la canActivate pour n'y acceder que lorsque l'util est connecté
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
  /*{ path: 'list-users-search', component: ListUsersSearchComponent},

  { path: 'job', component: JobComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'talent-worker', component: TalentWorkerComponent},
  { path: 'create-job', component: CreateJobComponent},
  { path: '**',    component: NoContentComponent },*/
];
