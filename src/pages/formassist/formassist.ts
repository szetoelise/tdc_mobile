import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { BookingProvider } from '../../providers/booking/booking';
/**
 * Generated class for the FormassistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formassist',
  templateUrl: 'formassist.html',
})
export class FormassistPage {
  public Assist ={id_user:'',company:'',city:'',qty:''};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider
  ) {
  }

  ionViewDidLoad() {
  
  }


  submitAssists(){
    if(this.Assist.company=='' || this.Assist.company==null){
      this.global.alertOK("Error Input","Input  company name / client name cannot be empty.");
      return false;
    }

    if(this.Assist.city=='' || this.Assist.city==null){
      this.global.alertOK("Error Input","Input city of company cannot be empty.");
      return false;
    }

    if(this.Assist.qty=='' || this.Assist.qty==null){
      this.global.alertOK("Error Input","Input rack qty cannot be empty.");
      return false;
    }
    this.global.showLoader("Please wait..");
    this.global.storage.get("id_user").then(id_user=>{
      this.Assist.id_user = id_user;
      this.booking.saveAssists(this.Assist).then(data=>{
        this.global.alertOK("Success","Your request will be processed. Our team will be contact you soon");
        this.global.loading.dismiss();
        this.navCtrl.pop();
      }).catch(err=>{
        this.global.loading.dismiss();
        this.global.alertOK("Error",err);
      });
    });

  }
//Your request will be processed. Our team will be contact you soon
  toBack(){
    this.navCtrl.pop();
  }  
}
