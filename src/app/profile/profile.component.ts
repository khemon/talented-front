import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {UserService} from '../service/users.service';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Profile` component loaded asynchronously');

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  providers: [AuthenticationService, UserService]
})
export class ProfileComponent implements OnInit{
  localState: any;
  private tab: number = 1;
  private user: User;
  private tabs = {'PROFILE':1, 'MESSAGES':2, "JOBS":3, "AVIS":4, "CONFIGURATION": 5};
  public currentTab: number;
  public reviews: any[];
  public errorMessage: string;

  constructor(private userService: UserService ) {}

  ngOnInit(){
    this.currentTab = this.tabs.PROFILE;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getUserReviews();
  }

  getUserReviews(){
    this.userService.getReviews(this.user.id).subscribe(
      response => this.reviews = response[0].reviews,
      error   =>  this.errorMessage = <any>error
      );
  }

  //TODO: update user from the form





}
