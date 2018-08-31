import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {GlobalProvider} from '../global/global';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(
    public http: Http,
    private global:GlobalProvider,
    private storage:Storage) {
    
    //console.log('Hello AuthServiceProvider Provider');
  }

  getRoles(email){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      //let myData = "email="+ credentials.email + "&password="+ credentials.password;
      this.http.get(this.global.endpoint+'Api_users/cek_role_users?email='+email, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });    
  }

  login(credentials) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      let myData = "email="+ credentials.email + "&password="+ credentials.password + "&id_role="+credentials.id_role;
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
      let myData = "email="+ credentials.email + "&password="+ credentials.password;
      this.http.post(this.global.endpoint+'Api_users/logout', myData, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }

  forgotPassword(email){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      let myData = "email="+ email;
      this.http.post(this.global.endpoint+'Api_users/forgot_password', myData, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }

  
requester_type(){
  return new Promise ((resolve, reject) => {
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    this.http.get(this.global.endpoint+'Api_users/requester_type',  {headers: headers})
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    })
  });   
}


list_whitelist(){
  return new Promise ((resolve, reject) => {
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    this.http.get(this.global.endpoint+'Api_users/list_whitelist',  {headers: headers})
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    })
  });   
}

}
