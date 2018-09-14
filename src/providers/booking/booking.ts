import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {GlobalProvider} from '../global/global';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
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
    public global:GlobalProvider,
    public httpClient: HttpClient
    ) {
    console.log('Hello BookingProvider Provider');
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

  historyRack(idBooking,id_user,id_role) {
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      let myData = "?id_booking=" + idBooking +"&id_user=" + id_user + "&id_role=" + id_role;
      this.http.get(this.global.endpoint+'Api_booking/historyrack'+myData,  options)
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



  cancelBooking(id_booking,id_user){
    return new Promise ((resolve, reject) => {
      let headers: HttpHeaders = new HttpHeaders();
      let myData = {
        id_booking:id_booking,
        id_user:id_user
      };

      this.httpClient.put(this.global.endpoint+'Api_booking/cancel_booking',myData, 
      {headers: new HttpHeaders().set('X-HTTP-Method-Override', 'PUT'),
      params: new HttpParams().set('id_booking', id_booking).set('id_user', id_user),
      })
      .subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

    cancelAssists(id_booking,id_user,note){
      return new Promise ((resolve, reject) => {
        let headers: HttpHeaders = new HttpHeaders();
        let myData = {
          id_booking:id_booking,
          id_user:id_user,
          note:note
        };

        this.httpClient.put(this.global.endpoint+'Api_booking/cancel_transaction',myData, 
        {headers: new HttpHeaders().set('X-HTTP-Method-Override', 'PUT'),
        params: new HttpParams().set('id_booking', id_booking).set('id_user', id_user).set('note', note),
        })
        .subscribe((res:any) => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
      });
    }

  updateValidator(id_user,id_booking,id_validator){
    return new Promise ((resolve, reject) => {
      let headers: HttpHeaders = new HttpHeaders();
      //headers.append('X-HTTP-Method-Override', 'PUT');
      let myData = {
        id_booking:id_booking,
        id_validator:id_validator,
        id_user:id_user
      };
      this.httpClient.put(this.global.endpoint+'Api_booking/updatevalidator',myData, 
      {
        headers: new HttpHeaders().set('X-HTTP-Method-Override', 'PUT'),
        params: new HttpParams().set('id_booking', id_booking).set('id_validator', id_validator).set('id_user',id_user),
      })
      .subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

  updateAssists(assistsData){
    return new Promise ((resolve, reject) => {
      let headers: HttpHeaders = new HttpHeaders();
      //headers.append('X-HTTP-Method-Override', 'PUT');
      let myData = {
        id_booking:assistsData.id_booking,
        id_user:assistsData.id_user,
        customer_name:assistsData.customer_name,
        customer_address:assistsData.customer_address,
        qty:assistsData.qty
      };

      this.httpClient.put(this.global.endpoint+'Api_booking/update_request_assistant',myData, 
      {
        headers: new HttpHeaders().set('X-HTTP-Method-Override', 'PUT'),
        params: new HttpParams()
        .set('id_booking', assistsData.id_booking)
        .set('id_user', assistsData.id_user)
        .set('customer_name',assistsData.customer_name)
        .set('customer_address',assistsData.customer_address)
        .set('qty',assistsData.qty),
      })
      .subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  } 
}
