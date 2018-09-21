import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {BookingProvider} from '../../providers/booking/booking';

import {GlobalProvider} from '../../providers/global/global';
//page
import {DatacenterPage} from '../datacenter/datacenter';
import {AvailabilityPage} from '../availability/availability';
import {HistoryPage} from '../history/history';
import {FormassistPage} from '../formassist/formassist';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {DatacenterdetailPage} from '../datacenterdetail/datacenterdetail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  public dacenCat:any= {};
  public dacen:any;
  public tempDacenCat:any={};
  public isLoading:boolean=false;
  public baseURL:string;
  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public restDacenCat:RestDacenCategoryProvider,
    public restDacen:RestDacenProvider,
    public global:GlobalProvider,
    public sp:SplashScreen,
    public book:BookingProvider) {
    this.baseURL = this.global.endpoint;
      
      //console.log("Token : " + this.global.checkToken());
      //if(!this.global.checkToken()){
        //this.navCtrl.setRoot(LoginPage);
      //}
      this.sp.hide();
      
      this.global.storage.ready().then(()=>{
        this.global.storage.get("islogin").then(data=>{          
          if(!data){
            this.navCtrl.setRoot(LoginPage);
          }
        });
      });
      
      this.getDacenCat();
 


  }

  getDacenCat(){
    this.isLoading=true;
      this.restDacen.listAll().then(data1=>{
        this.isLoading=false;
        this.dacen = data1['data'];
      }).catch(err=>{
        this.isLoading=false;
      });
      //this.dacenCat = data['data'];

   
  }

  generateTree(item){
    console.log(item.id_dacencategory);
    //this.dacenCat.id= item.id_dacencategory;
    console.log(this.dacenCat);
  }

  viewDataCenter(){
    this.navCtrl.push(DatacenterPage);
  }

  viewAvailability(){
    this.navCtrl.push(AvailabilityPage);
  }

  viewHistory(){
    this.navCtrl.push(HistoryPage);
  }

 viewAssist(){

  
  this.global.storage.ready().then(()=>{
    this.global.storage.get("id_role").then(id_role=>{
      console.log(id_role + "test");
      if(id_role=="2"){
        this.navCtrl.push(FormassistPage);
      }else{
        this.global.alertOK("Invalid Role","Please Login as Requester");
      }



    })
  })

   
 }

 viewDataCenterDetail(id:string){
  console.log(id);
  this.navCtrl.push(DatacenterdetailPage,{id:id});
}

}
