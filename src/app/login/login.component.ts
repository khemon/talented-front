/**
 * Created by Khémon on 24/11/2016.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';
import {UserService} from "../service/user.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Login` component loaded asynchronously');

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [UserService]
})
export class LoginComponent {
  submitted = false;
  user;
  errorMessage: string;
  loginForm: FormGroup;

  constructor(public route: ActivatedRoute,
              private userService: UserService) {

  }
  ngOnInit(){
    this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    );
  }
  onSubmit() {
    this.authenticate();
    this.submitted = true;
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  authenticate(){
    this.userService.authenticate(this.username.value, this.password.value).subscribe(
      user => this.user = user,
      error => this.errorMessage = <any>error
    );
  }

}
