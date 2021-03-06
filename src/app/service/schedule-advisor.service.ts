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


export class ScheduleAdvisorService {
  private apiEndPoint = 'api/schedule-advisor/';
  private apiUrl;
  private mockDataUrl;
  private mode = DATA_SOURCE.BACK_END_API; // change to BACK_END_API to fetch data from server

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }

  private postBaseUrl(endUrl: string){
    var url = '';
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint;
        break;
      default :
        url = 'http://localhost:4200/'+  this.apiEndPoint;;
    }
    return url+ endUrl;
  }

  /**
   * Retourne un planning optimise en fonction de
   * - userId: l'id utilisateur
   * - talents: les types de jobs que l'utilisateur consent à faire
   * - distance: la distance max des jobs par rapport au domicile du user
   */

  getCustomJobSchedule(userId: string, maxDistance: number): Observable<Job[]> {
    let params = JSON.stringify({'userId': userId, 'maxDistance': maxDistance});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    var url = this.postBaseUrl('custom') ;
    return this.http.post(url, params, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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
