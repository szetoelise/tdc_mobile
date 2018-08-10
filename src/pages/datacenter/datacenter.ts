import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams,MenuController, AlertController, ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import 'rxjs/add/operator/map';
import {Observable,Subject} from 'rxjs/Rx';
import {DatacenterdetailPage} from '../datacenterdetail/datacenterdetail';

/**
 * Generated class for the DatacenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datacenter',
  templateUrl: 'datacenter.html',
})
export class DatacenterPage {
  private dacenCat:any;
  private dacen:any;
  private loading;
  private isLoading:boolean;
  private cboDatcenCat:any;
  private baseURL:string;

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    public loadingCtrl: LoadingController,
    public global:GlobalProvider
  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DatacenterPage');
    this.baseURL = this.global.endpoint;
    this.getDacenCat();
  }
  datcenCatChange(){
    
    this.getDacen(this.cboDatcenCat);
    console.log(this.cboDatcenCat);
  }

  getDacenCat(){
    this.showLoader();
    this.restDacenCat.listCategory()
    .then(data => {
      this.loading.dismiss();
      this.dacenCat = data['data'];
      //for (let val of this.dacenCat){
      //  console.log(val.dacencategory);
      //}
      //this.dacenCat.forEach(this.generateTree)
      //console.log(this.dacenCat);
    });
  }

  getDacen(id:string){
    this.isLoading=true;
    this.restDacen.listDacenByCategory(id)
    .then(data => {
      this.isLoading=false;
      this.loading.dismiss();
      this.dacen = data['data'];
      
      //
      //console.log(this.dacen);
    });
  }



  viewDataCenterDetail(id:string){
    console.log(id);
    this.navCtrl.push(DatacenterdetailPage,{id:id});
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

}
