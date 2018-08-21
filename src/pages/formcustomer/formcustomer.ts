import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';

/**
 * Generated class for the FormcustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formcustomer',
  templateUrl: 'formcustomer.html',
})
export class FormcustomerPage {
  public am:any;
  public company:any;
  public city:any;
  public price:any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormcustomerPage');
  }
  toBack(){
    this.navCtrl.pop();
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

  doSubmit()
  {
    if(!this.am){
      this.presentToast("AM Reference input column cannot be empty.");
      return false;
    }

    if(!this.company){
      this.presentToast("Company Name / Client input column cannot be empty.");
      return false;
    }

    if(!this.city){
      this.presentToast("City of company input column cannot be empty.");
      return false;
    }

    if(!this.price){
      this.presentToast("Price input column cannot be empty.");
      return false;
    }

    // validator: test
    // customer_name: test
    // customer_address: test
    // price_request:

  }
}
