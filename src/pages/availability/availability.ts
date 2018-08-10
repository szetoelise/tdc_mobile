import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams,MenuController, AlertController, ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import 'rxjs/add/operator/map';
import {Observable,Subject} from 'rxjs/Rx';
import {DatacenterdetailPage} from '../datacenterdetail/datacenterdetail';

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
  private baseURL:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    public loadingCtrl: LoadingController,
    public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  onInput(v){

  }

  onCancel(v){

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }


}
