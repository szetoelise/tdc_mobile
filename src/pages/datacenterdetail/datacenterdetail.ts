import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams,MenuController, AlertController, ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import {DiagrampowerPage} from '../diagrampower/diagrampower';
import {ConnectivityPage} from '../connectivity/connectivity';
import {BuildingPage} from '../building/building';
import {CertificatePage} from '../certificate/certificate';
/**
 * Generated class for the DatacenterdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datacenterdetail',
  templateUrl: 'datacenterdetail.html',
})
export class DatacenterdetailPage {
  private id:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.id = navParams.get("id");
    this.id="1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatacenterdetailPage');
    //alert(this.id);
  }

  viewCertificate(){
    this.navCtrl.push(CertificatePage,{id:this.id});
  }

  viewDiagramPower(){
    this.navCtrl.push(DiagrampowerPage,{id:this.id});
  }

  viewConnectivity(){
    this.navCtrl.push(ConnectivityPage,{id:this.id});
  }

  viewBuilding(){
    this.navCtrl.push(BuildingPage,{id:this.id});
  }
}
