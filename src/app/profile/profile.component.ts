import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Profile` component loaded asynchronously');

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  providers: [AuthenticationService]
})
export class ProfileComponent {
  localState: any;
  private tab: number = 1;
  private user: User;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }





}
