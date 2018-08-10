import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {GlobalProvider} from '../global/global';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http,private global:GlobalProvider) {
    
    //console.log('Hello AuthServiceProvider Provider');
  }
  login(credentials) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      let myData = "email="+ credentials.email + "&password="+ credentials.password;
      this.http.post(this.global.endpoint+'Api_users/login', myData, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  } 

  logout(credentials) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.post(this.global.endpoint+'Api_users/logout?email='+credentials.email+'&password='+credentials.password, JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }

}
