import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams,MenuController, AlertController, ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import 'rxjs/add/operator/map';
import {Observable,Subject} from 'rxjs/Rx';
import {DatacenterdetailPage} from '../datacenterdetail/datacenterdetail';
import {PickbuildingPage} from '../pickbuilding/pickbuilding';

/**
 * Generated class for the AvailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html',
})
export class AvailabilityPage {
  private dacenCat:any;
  private dacen:any;
  private loading;
  private isLoading:boolean;
  private cboDatcenCat:any;
  private BaseURL:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    public loadingCtrl: LoadingController,
    public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
    this.showLoader();
    let dacen=[];
    this.BaseURL = this.global.endpoint;
    let rDacen = this.restDacen;
    this.restDacen.availabilityRack().then(data=>{
      data['data'].forEach(function(key,index) {
        rDacen.detailById(data['data'][index].id_dacen).then(data1=>{
          data1['data'][index].rack = data['data'][index].jml_rack;
          dacen.push(data1['data'][index]);
        }).catch(err1=>{
          console.log(err1);
        });
        

      });
        this.loading.dismiss();
        this.dacen = dacen;
        //console.log(dacen);
    }).catch(err=>{
      console.log(err);
    });
  }

  onInput(v){

  }

  onCancel(v){

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  clickDacen(id_dacen:string){
    this.navCtrl.push(PickbuildingPage,{id_dacen:id_dacen});
  }

}
