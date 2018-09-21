import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams } from 'ionic-angular';
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
  private building:any;
  private loading;
  private isLoading:boolean;
  private cboDatcenCat:any;
  private cboDacen:any;
  
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
  //Begin CBO changes
  datcenCatChange(){
    this.getDacen(this.cboDatcenCat);
    console.log(this.cboDatcenCat);
  }
  

  //End CBO changes


  getDacenCat(){
    this.showLoader();
    this.restDacenCat.listCategory()
    .then(data => {
      this.loading.dismiss();
      this.dacenCat = data['data'];
    });
  }

  getDacen(id:string){
    this.showLoader();
    this.restDacen.listDacenByCategory(id)
    .then(data => {
      this.isLoading=false;
      this.loading.dismiss();
      this.dacen = data['data'];
    });
  }



  viewDataCenterDetail(id:string){
    console.log(id);
    this.navCtrl.push(DatacenterdetailPage,{id:id});
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
