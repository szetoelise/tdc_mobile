import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the CertificatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certificate',
  templateUrl: 'certificate.html',
})
export class CertificatePage {
  public getCertificate:any;
  public getCertified:any;
  public id:string;
  public startDate:any;
  public minDate:any;
  loading:any;
  public BaseURL:string;
  //public getCertificate:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dacen:RestDacenProvider,
    public global:GlobalProvider,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) {
      this.BaseURL = this.global.endpoint;
      
    }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    //this.id = "1";
    this.showLoader();
    console.log('ionViewDidLoad CertificatePage');
    this.dacen.detailById(this.id).then(data=>{
      this.getCertificate = data['certification'];
      this.getCertified = data['certified'];
      this.loading.dismiss();
    }).catch(err=>{
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  
    this.loading.present();
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
