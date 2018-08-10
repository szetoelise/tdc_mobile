import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {GlobalProvider} from '../global/global';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestDacenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestDacenProvider {

  constructor(public http: Http,private global:GlobalProvider) {
    console.log('Hello RestDacenProvider Provider');
  }

  listDacenByCategory(id:string) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/datacenter_list?id_dacencategory='+id, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  } 

  detailById(id:string){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/datacenter_detail?id_dacen='+id, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }
}
