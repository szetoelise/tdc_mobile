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


  listAll(){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/datacenter_detail', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }

  listValidator(){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/validator', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }

  listCertificateDacenById(id:string){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/list_certificate?id_certification='+id, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }

  listBuildingByDacen(id:string){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/building?id_dacen='+id, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }

  listFloor(id_dacen:string,id_building:string){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/floorlist?id_dacen='+id_dacen+'&id_building='+ id_building, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }

  mappingRack(id_dacen:string,id_sector:string,id_floor:string){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/mappingrack?id_dacen='+id_dacen+'&id_sector='+id_sector+'&id_floor='+id_floor, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });    
  }


  availabilityRack(){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/availabilityrack', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });
  }

  listAllDacen(){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();   
      headers.append('content-type', 'application/x-www-form-urlencoded');
      this.http.get(this.global.endpoint+'Api_dacen/datacenter_list', {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      })
    });   
  }

}
