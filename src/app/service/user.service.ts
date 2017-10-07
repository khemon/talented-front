/**
 * Created by Khémon on 21/11/2016.
 */
import  {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
//import {HttpClient} from '@angular/common/http'; /*TODO: utiliser HTTPClient*/
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';
import {APP_CONFIG} from '../app-config';
import {AppConfig} from '../iapp-config';
import 'rxjs/Rx';
import {DATA_SOURCE} from './data-source';

@Injectable()
export class UserService {
  private apiEndPoint = 'user';
  private apiUrl;
  private mockDataUrl;
  private mode = DATA_SOURCE.MOCK_DATA
  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    // Base URL for Talented API
    this.apiUrl = config.apiUrl;
    this.mockDataUrl = config.mockDataUrl;
  }

  /**
   * Retourne la liste des utilisateurs de la BDD
   */
  getUsers(): Observable<User[]>{
    var url;
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint;
        break;
      default :
        url = this.mockDataUrl+'users.json';
    }
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**TODO
  * Retourne un utilisateur à partir de son Id
  */
  getUserById(id: string): Observable<User[]>{
    var url = this.apiUrl + this.apiEndPoint + '/' + id;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Retourne la liste des utilisateurs disponibles
   * aux alentours d'un job donné
   * Signature : getUsersAvailableByJob(Job job);
   */
  getTalentsAvailableByJob() : Observable<User[]>{
    var url;
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint;
        break;
      default :
        url = this.mockDataUrl+'users.json';
    }
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }


  /**
   * Notifie l'utilisateur donné avec le message passé en paramètre
   * A réfléchir si on ajoute un type de message pour pouvoir créer des
   * templates de messages a envoyer aux utilisateurs
   * Signature : notifyUser(User user, String message)
   * Signature 2 : notifyUser(User user, int typeMessage)
   */
   //notifyUser() : void {}

  addUser(user: User): Observable<User> {
    let userString = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    var url;
    switch(this.mode) {
      case DATA_SOURCE.BACK_END_API:
        url = this.apiUrl + this.apiEndPoint + '/add';
        break;
      default:
        url = 'http://localhost:4200/user/add'// this.apiEndPoint + '/add';
    }
    alert(userString);
    return this.http.post(url, userString, options)
          .map((response: Response) => {
            let token= response.json() && response.json().token;
            alert(response.json().token);
            return token
          })
          .catch(this.handleError);
     }
/*
  (id: numgetUserber): Observable<User> {
    return this.getUsers().
    subscribe(
      users => users.find(user => user.id === id)
    )
  }


  update(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  addUser(user: User): Observable<User> {
    let userString = JSON.stringify(user);
    let headers = this.headers;
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.usersUrl, userString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private deleteUser(username: string): Observable<User> {

    return this.http.delete(`${this.usersUrl}/${username}`)
      .map(this.extractData)
      .catch(this.handleError);
  }*/

  private extractData(res: Response) {
    let body = res.json();
    alert(body.data);
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
