/**
 * Created by Khémon on 07/12/2016.
 */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
//import {HttpClient} from '@angular/common/http'; /*TODO: utiliser HTTPClient*/
import {Job} from '../model/job';
import {Observable} from 'rxjs/Observable';
import {APP_CONFIG} from '../app-config';
import {AppConfig} from '../iapp-config';
import 'rxjs/Rx';
import {GPSLocation} from "../model/gps-location";
import {Talent} from "../model/talent";
import {DATA_SOURCE} from './data-source';

@Injectable()


export class JobService {
  private apiEndPoint = 'api/jobs/active';
  private apiUrl;
  private mockDataUrl;
  private mode = DATA_SOURCE.MOCK_DATA; // change to BACK_END_API to fetch data from server

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }

  /**
   * Retourne la liste des job request de la BDD
   */
  getAll(): Observable<Job[]>{
    var url;
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint;
        break;
      default :
        url = this.mockDataUrl+'jobs.json';
    }
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * post a new job to server
   * @param user
   * @returns {Observable<JobRequest>}
   */
  create(job: Job): Observable<Job> {
    let userString = JSON.stringify(job);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    alert(userString);
    return this.http.post(this.apiUrl + 'job/add', userString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    let data = body.data || { };
    data.forEach((d) => {
      d.date = new Date(d.date);

      var gpsLocation = new GPSLocation();
      gpsLocation.latitude = d.location.x;
      gpsLocation.longitude = d.location.y;
      d.location = gpsLocation;
      var talent = new Talent();
      talent.id = d.talent.id;
      talent.name = d.talent.name;
      d.talent = talent;
    });
    return data;

  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
