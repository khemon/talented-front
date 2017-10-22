import  {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {DATA_SOURCE} from './data-source';
import 'rxjs/add/operator/map';
import {AppConfig} from '../iapp-config';
import {APP_CONFIG} from '../app-config';
import {User} from "../model/user";
//import { JwtHelper } from '@auth0/angular-jwt';



@Injectable()
export class AuthenticationService {
  private apiEndPoint = 'api/authenticate/';
  private apiUrl;
  private mockDataUrl;
  private mode = DATA_SOURCE.MOCK_DATA
  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private http: Http,
             // public jwtHelper: JwtHelper
  ) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }


  /**
   * appelle le service back end qui va :
   * 1. verifier l'existence de l'utilsateur en base (login, password)
   * 2. retourner le token de la session
   */
  login(username: string, password: string) : Observable<User[]>{
    let userString = JSON.stringify({username: username, password: password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    var url;
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint;
        break;
      default:
        url = 'http://localhost:4200/' + this.apiEndPoint;
    }
    alert(url);
    return this.http.post(url, userString, options)
      .map((response: Response) => {
        let user = response.json();
        if(user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          alert("user loggé, id " + user.id + " token: " + user.token);
        }
        return user
      })
      .catch(this.handleError);
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    alert('logout service');
  }

  public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return token != null;
      // Check whether the token is expired and return
      // true or false
    //   return !this.jwtHelper.isTokenExpired(token);
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
