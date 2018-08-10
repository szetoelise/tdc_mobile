import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {GlobalProvider} from '../global/global';
import 'rxjs/add/operator/map';
/*
  Generated class for the RestDacenCategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestDacenCategoryProvider {

  constructor(public http: Http,private global:GlobalProvider) {
    console.log('Hello RestDacenCategoryProvider Provider');
  }
  listCategory() {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/dacencategory', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  } 
}
