import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';

/**
 * Generated class for the UpdatevalidatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatevalidator',
  templateUrl: 'updatevalidator.html',
})
export class UpdatevalidatorPage {
  public validator:any;
  public id_booking:string;
  public invoice:string;
  public id_user:string;
  public cboValidator:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider,
    public dacen:RestDacenProvider) {
      this.id_booking = this.navParams.get("id_booking");
      this.invoice = this.navParams.get("invoice");
      this.id_user = this.navParams.get("id_user");

  }

  ionViewDidLoad() {
    this.global.showLoader("Please wait..");
    this.dacen.listValidator().then(data=>{
      this.validator = data['data'];
      this.global.loading.dismiss();
    }).catch(err=>{
      this.global.loading.dismiss();
      this.global.alertOK("Error",err);
    })
  }

  validatorChange(){

  }

  toBack(){
    this.navCtrl.pop();
  }

  clickSubmit(){
    
    if(this.cboValidator==null || this.cboValidator==''){
      this.global.alertOK("Error","You must select at least 1 validator to continue.");
      return false;
    }else{
      this.global.showLoader("Please wait..");
      this.global.loading.dismiss();
      this.booking.updateValidator(this.id_user,this.id_booking,this.cboValidator).then(data=>{
        this.global.loading.dismiss();
        this.navCtrl.pop();
        console.log(data);
      }).catch(err=>{
        this.global.loading.dismiss();
        console.log(err);
      })
    }
  }
}
