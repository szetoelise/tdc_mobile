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


  editBooking(idBooking){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({
        headers: headers
      });
      let myData = "?id_booking=" + idBooking;
      this.http.get(this.global.endpoint+'Api_booking/edit_booking'+myData,  options)
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
      //let headers: HttpHeaders = new HttpHeaders();
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
        //let headers: HttpHeaders = new HttpHeaders();
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
      //let headers: HttpHeaders = new HttpHeaders();
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
      //let headers: HttpHeaders = new HttpHeaders();
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


  updateTransactionStatus(id_user,id_booking,id_statustransaksi,note){
    return new Promise ((resolve, reject) => {
      //let headers: HttpHeaders = new HttpHeaders();
      //headers.append('X-HTTP-Method-Override', 'PUT');
      let myData = {
        id_booking:id_booking,
        id_statustransaksi:id_statustransaksi,
        id_user:id_user,
        note:note
      };
      this.httpClient.put(this.global.endpoint+'Api_booking/update_status_booking',myData, 
      {
        headers: new HttpHeaders().set('X-HTTP-Method-Override', 'PUT'),
        params: new HttpParams().set('id_booking', id_booking)
        .set('id_statustransaksi', id_statustransaksi)
        .set('id_user',id_user)
        .set('note',note),
      })
      .subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

  updateStatusCommit(id_user,id_booking,id_rackstatus,days_commit){
    return new Promise ((resolve, reject) => {
      //let headers: HttpHeaders = new HttpHeaders();
      //headers.append('X-HTTP-Method-Override', 'PUT');
      let myData = {
        id_booking:id_booking,
        id_rackstatus:id_rackstatus,
        id_user:id_user,
        days_commit:days_commit
      };
      this.httpClient.put(this.global.endpoint+'Api_booking/update_status_commit',myData, 
      {
        headers: new HttpHeaders().set('X-HTTP-Method-Override', 'PUT'),
        params: new HttpParams().set('id_booking', id_booking)
        .set('id_rackstatus', id_rackstatus)
        .set('id_user',id_user)
        .set('days_commit',days_commit),
      })
      .subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

  updateBooking(myData) {
    return new Promise ((resolve, reject) => {
      let headers: HttpHeaders = new HttpHeaders();
      let params:HttpParams = new HttpParams();
      
      //headers.append('X-HTTP-Method-Override', 'PUT');
      headers.set('X-HTTP-Method-Override', 'PUT');
      params.set('id_booking', myData.id_booking);
      params.set('id_user', myData.id_user);
      params.set('id_user_ubah', myData.id_user_ubah);
      params.set('id_rackstatus_current_lawas', myData.id_rackstatus_current_lawas);
      params.set('id_rackstatus_current', myData.id_rackstatus_current);
      params.set('date_commit_lawas', myData.date_commit_lawas);
      let idrack = myData.id_rack;
      let i:number = 0;
      myData.id_rack.forEach(function(key,index){
        params.set('id_rack['+i+']', idrack[index]);      
        i++;  
      });
      
      let idalacarte = myData.id_alacarte
      myData.id_alacarte.forEach(function(key,index){
        params.set('id_alacarte['+key+']', idalacarte[index]);     
        i++;  
      });
      

      params.set('validator', myData.validator);
      params.set('customer_name', myData.customer_name);
      params.set('customer_address', myData.customer_address);
      params.set('price_request', myData.price_request);
      params.set('note_additional', myData.note_additional);
      params.set('invoice', myData.invoice);
      // id_user:id_user,
      // id_user_ubah:this.editData.id_user,
      // id_rackstatus_current_lawas: this.editData.id_rackstatus_current_lawas,
      // id_rackstatus_current:this.id_rackstatus_current,
      // date_commit_lawas:this.editData.date_commit,
      // id_rack : this.id_rack_edit,
      // id_alacarte:this.id_alacarte,
      // validator:this.am,
      // customer_name:this.company,
      // customer_address:this.city,
      // price_request:this.price,
      // note_additional:this.note_additional,
      // invoice:this.invoice
      
      this.httpClient.put(this.global.endpoint+'Api_booking/update_booking',myData, 
      {
        headers,
        params        
      })
      .subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  } 

}
