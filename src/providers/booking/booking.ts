import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {GlobalProvider} from '../global/global';
//import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from "@angular/http";
/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  constructor(
    public http: Http,
    public global:GlobalProvider
    ) {
    console.log('Hello BookingProvider Provider');
  }



  tesBooking(myData){
    return new Promise ((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      this.http.post('http://bukusaku.cloudsigma.id/webservices/wsdevices/test', myData, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })     
    });
  }

  saveBooking(myData) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      //let myData = dataString;
      this.http.post(this.global.endpoint+'Api_booking/save_booking', myData, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  } 

  historyRack(idBooking) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      this.http.get(this.global.endpoint+'Api_booking/historyrack?id_booking=' + idBooking,  options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }   

  saveAssists(assist) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      let myData = "id_user=" + assist.id_user  + "&customer_name=" + assist.company + "&customer_address=" + assist.city + "&qty=" + assist.qty;
      this.http.post(this.global.endpoint+'Api_booking/request_assistant', myData, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  } 



  cancelBooking(id_booking){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      let myData = "id_booking=" +id_booking
      this.http.put(this.global.endpoint+'Api_booking/cancel_booking?'+myData, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }

}
