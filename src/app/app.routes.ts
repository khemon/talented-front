import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register';
import { HomeComponent } from './home';
/*import { NoContentComponent } from './no-content';*/
import {LoginComponent} from "./login";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {ListJobsComponent} from "./list-jobs/list-jobs.component";
import {CreateJobComponent} from "./create-job";
import {ListUsersSearchComponent} from "./list-users-search/list-users-search.component";
import {JobComponent} from "./job/job.component";
import {ScheduleOptimizerComponent} from "./schedule-optimizer/schedule-optimizer.component";
import {TalentWorkerComponent} from "./talent-worker/talent-worker.component";
/*import {ContactComponent} from "./contact/";
import {ProfileComponent} from './profile';

import {ListUsersSearchComponent} from "./list-users-search/list-users-search.component";

*/


export const ROUTES: Routes = [
  { path: 'register-user', component: RegisterComponent} ,
  { path: '',      component: HomeComponent},
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'create-job', component: CreateJobComponent},// TODO: ajouter la canActivate pour n'y acceder que lorsque l'util est connecté
  { path: 'list-jobs', component: ListJobsComponent}, // TODO: ajouter la canActivate pour n'y acceder que lorsque l'util est connecté
  { path: 'list-users-search', component: ListUsersSearchComponent},
  { path: 'schedule-optimizer', component: ScheduleOptimizerComponent},
  { path: 'job', component: JobComponent},
  { path: 'talent-worker', component: TalentWorkerComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
/*

  { path: 'contact', component: ContactComponent },
  { path: 'talent-worker', component: TalentWorkerComponent},
  { path: '**',    component: NoContentComponent },*/
];
