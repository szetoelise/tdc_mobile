import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { BookingProvider } from '../../providers/booking/booking';
/**
 * Generated class for the EditformassistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editformassist',
  templateUrl: 'editformassist.html',
})
export class EditformassistPage {
  public Assist ={id_booking:'',id_user:'',customer_name:'',customer_address:'',qty:''};
  public id_booking;
  public id_user;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider
  ) {
    this.id_booking = this.navParams.get("id_booking");
  }

  ionViewDidLoad() {
    this.global.showLoader("Please wait..");
    this.global.storage.get("id_user").then(id_user=>{
      this.id_user = id_user;
      this.global.storage.get("id_role").then(id_role=>{
        this.booking.historyRack(this.id_booking,id_user,id_role).then(data=>{
            this.Assist.id_booking = this.id_booking;
            this.Assist.id_user = id_user;
            this.Assist.customer_name = data['data'].users[0].customer_name;
            this.Assist.customer_address = data['data'].users[0].customer_address;
            this.Assist.qty = data['data'].users[0].qty;
            this.global.loading.dismiss();
            
        }).catch(err=>{
          this.global.loading.dismiss();
          this.global.alertOK("Error",err);
        });  
      })
    });
    //this.booking.historyRack(this.id_booking).then(data=>{

    //})
  }

  submitAssists(){
    if(this.Assist.customer_name=='' || this.Assist.customer_name==null){
      this.global.alertOK("Error Input","Input  company name / client name cannot be empty.");
      return false;
    }

    if(this.Assist.customer_address=='' || this.Assist.customer_address==null){
      this.global.alertOK("Error Input","Input city of company cannot be empty.");
      return false;
    }

    if(this.Assist.qty=='' || this.Assist.qty==null){
      this.global.alertOK("Error Input","Input rack qty cannot be empty.");
      return false;
    }
    this.Assist.id_booking = this.id_booking;
    this.Assist.id_user = this.id_user;
    this.global.showLoader("Please wait..");
    this.global.storage.get("id_user").then(id_user=>{
      this.Assist.id_user = id_user;
      this.booking.updateAssists(this.Assist).then(data=>{
        this.global.alertOK("Success","Your request has been changed");
        this.global.loading.dismiss();
        this.navCtrl.pop();
      }).catch(err=>{
        this.global.loading.dismiss();
        this.global.alertOK("Error",err);
      });
    });

  }


  toBack(){
    this.navCtrl.pop();
  }
}
