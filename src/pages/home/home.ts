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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  private dacenCat:any= {};
  private dacen:any;
  private tempDacenCat:any={};
  private isLoading:boolean=false;
  private baseURL:string;
  constructor(
    platform: Platform,
    public navCtrl: NavController,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    private global:GlobalProvider,
    private sp:SplashScreen,
    private book:BookingProvider) {
    this.baseURL = this.global.endpoint;
   

      sp.hide();  
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
    this.restDacenCat.listCategory()
    .then(data => {
     
      this.restDacen.listAll().then(data1=>{
        this.isLoading=false;
        this.dacen = data1['data'];
      }).catch(err=>{
      });
      this.dacenCat = data['data'];

    }).catch(err=>{
      console.log(err);
    });
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
   this.navCtrl.push(FormassistPage);
 }

}
