/**
 * Created by Khémon on 09/12/2016.
 */

/*
 * Angular 2 decorators and services
 */
import {Component} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'header-talented',
  templateUrl: './header.component.html',
  providers: [AuthenticationService]
})

export class HeaderComponent{

  constructor(public auth: AuthenticationService, public router: Router) {}

  logout(){
    alert('test logout');
    this.auth.logout();
    this.router.navigate(['/home']);
  }

}


