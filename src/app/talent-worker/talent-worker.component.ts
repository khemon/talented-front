/**
 * Created by Khémon on 24/11/2016.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../model/user';
import {UserService} from "../service/users.service";
import {Subscription} from "rxjs";
import {TAB_LIST} from './tabs';

console.log('`Talent-worker` component loaded asynchronously');

@Component({
  selector: 'talent-worker',
  templateUrl: 'talent-worker.component.html',
  providers: [UserService]

})
export class TalentWorkerComponent {
  public tabs= TAB_LIST;
  public currentTab: number = TAB_LIST.DESCRIPTION;
  private userId: string;
  public isUserReady = false;
  private subscription: Subscription;
  public user: User;


  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        this.userId = param['id'];
        console.log(this.userId);
      });
    this.getUserById(this.userId);

  }
  getUserById(userId: string): void {
    /* TODO: modifier pour appeler le service getUserById()
     */
    if(userId == null){ return;}
    this.userService.getAll()
      .subscribe(
        users => {
          // TODO: sale à modifier
          for(let i= 0; i < users.length; i++){
            if(users[i].id == userId){
              this.user = users[i];
              this.isUserReady = true;
              break;
            }
          }
        },
        error => console.log(<any>error));
  }

}
