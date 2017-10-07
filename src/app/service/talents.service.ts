/**
 * Created by Khémon on 07/12/2016.
 */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
//import {HttpClient} from '@angular/common/http'; /*TODO: utiliser HTTPClient*/
import {Talent} from '../model/talent';
import {Observable} from 'rxjs/Observable';
import {APP_CONFIG} from '../app-config';
import {AppConfig} from '../iapp-config';
import 'rxjs/Rx';
import {DATA_SOURCE} from './data-source';

@Injectable()
export class TalentService {
  private apiEndPoint = 'talent'
  private apiUrl;
  private mockDataUrl;
  private mode = DATA_SOURCE.MOCK_DATA;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }

  /**
   * Retourne la liste des types de jobs de la BDD
   */
  getTalents(): Observable<Talent[]>{
    var url;
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint;
        break;
      default :
        url = this.mockDataUrl+'talents.json';
    }
    return this.http.get(url)
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
