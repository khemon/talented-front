/**
 * Created by Khémon on 10/12/2017.
 */

import {User} from "./user";
import {Job} from "./job";


export class Application {

  public user: User;
  public job: Job;
  public creationDate: Date;
  constructor() {
    this.creationDate = new Date();
  }
}
