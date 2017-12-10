import {Talent} from "./talent";
import {GPSLocation} from "./gps-location";
import {Application} from "./application";
/**
 * Created by Khémon on 23/11/2016.
 */


export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public address: string;
  public location?: GPSLocation;
  public talent?: Talent[]; // liste des talents
  public password?: string;
  public picture: string;
  public hourlyRate:string;
  public about: string;
  public phone?: string;
  public create_time?: Date;
  public birthdate?: Date;
  public applications: Application[];

  constructor() {
    this.hourlyRate = '20';
    this.about = 'Irure sit mollit culpa adipisicing minim aliqua fugiat laborum laborum velit voluptate Lorem. ' +
    'Ad tempor labore ex ullamco. Tempor nostrud velit ex occaecat. Proident velit dolore aliqua nulla do ipsum deserunt amet deserunt sunt id velit voluptate. ' +
    'Amet laboris proident esse sunt veniam ex eu qui incididunt adipisicing mollit laborum adipisicing proident. Ea pariatur commodo amet officia esse sunt sint voluptate.\r\n';
    this.picture = Math.floor((Math.random() * 8) + 1).toString();
    this.location = new GPSLocation();
  }

  public getName(): string {
    return this.firstName+ " "+ this.lastName;
  }
}
