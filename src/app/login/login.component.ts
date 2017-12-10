/**
 * Created by Khémon on 24/11/2016.
 */

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Login` component loaded asynchronously');

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthenticationService]
})
//export class LoginContent {
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    );
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  login(){
    this.errorMessage = null;
    this.loading = true;
    this.authenticationService.login(this.username.value, this.password.value).subscribe(
      user => {
        // login successful so redirect to return url
        alert(user);
        if(user != null ){
          this.router.navigateByUrl(this.returnUrl);
        }
        this.loading = false;
      },
      error => {
        // login failed so display error
        this.errorMessage = <any>error;
        alert(this.errorMessage);
        this.loading = false;
      });

  }

}

