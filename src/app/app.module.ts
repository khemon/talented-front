import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { RouterModule } from '@angular/router';

import {SelectModule} from 'ng2-select';
import { AppState, InternalStateType } from './app.service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


import { HttpModule, JsonpModule  } from '@angular/http';
import {MaterialModule} from './material'
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";

import {UserService} from "./service/users.service";
import {JobService} from "./service/job.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ROUTES } from './app.routes';
import {APP_CONFIG, TALENTED_DI_CONFIG } from './app-config'
import {InMemoryWebApiModule} from "angular-in-memory-web-api";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "./service/alert.service";
import {AuthenticationService} from "./service/authentication.service";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    SelectModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5LiWnQoVNvjT7H1w2Omzyleyx8r-3b-Y',
      libraries: ['places'],
    }),


  ],
  providers: [
    // expose our Services and Providers into Angular's dependency injection
    //APP_PROVIDERS,
    {provide: APP_CONFIG, useValue: TALENTED_DI_CONFIG},
    UserService,
    JobService,
    AuthenticationService,
    AuthGuard,
    //AppState

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    //comment 3 rows above if you want to disable fake backend*/

    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
