import {User} from "./user";
import {Talent} from "./talent";
import {GPSLocation} from "./gps-location";

/**
 * Created by Khémon on 07/12/2016.
 */



export class Job {

  public talent: Talent;
  public date: Date;
  public address: string;
  public location: GPSLocation;
  public description: string;
  public id?: string;
  public owner?: User;
  public picture?: string;
  constructor() {
      this.date = new Date();
  }
}
