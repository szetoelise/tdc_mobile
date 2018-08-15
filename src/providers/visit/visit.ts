import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {GlobalProvider} from '../global/global';
import 'rxjs/add/operator/map';


/*
  Generated class for the VisitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VisitProvider {

  constructor(public http: Http, public global:GlobalProvider) {
    console.log('Hello VisitProvider Provider');
  }

  listAll(){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      
      this.http.get(this.global.endpoint+'Api_visit/visitlist', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }

  listAllBookingRack(){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_booking/historyrack', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });    
  }


}
