import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global'
import {BookingProvider} from '../../providers/booking/booking';

/**
 * Generated class for the EdittransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edittransaction',
  templateUrl: 'edittransaction.html',
})
export class EdittransactionPage {
  public cboTransaction:any;
  public id_booking:any;
  public id_statustransaksi:any;
  public iwo:any;
  public note:any;
  id4:boolean=false;
  id5:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider
    ) {
      this.id_booking = this.navParams.get("id_booking");
      this.id_statustransaksi = this.navParams.get("id_statustransaksi");   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdittransactionPage');
    this.cboTransaction = this.id_statustransaksi;
  }
  
  toBack(){
    this.navCtrl.pop();
  }

  submitUpdateTransaction(){  
    let notetxt

    if(this.cboTransaction==null || this.cboTransaction==""){
      this.global.alertOK("Error","Choose transaction status first.");
      return false;
    }

    if(this.cboTransaction=="4"){
      if(this.iwo=="" || this.iwo==null){
        this.global.alertOK("Error","Input IWO/Opportunity cannot be empty.");
        return false;
      }else{
        notetxt = this.iwo;
      }
    }else if(this.cboTransaction=="5"){
      if(this.note=="" || this.note==null){
        this.global.alertOK("Error","Input Note cannot be empty.");
        return false;
      }else{
        notetxt = this.note;
      }
    }

    this.global.showLoader("Please wait..");
    this.global.storage.get("id_user").then(id_user=>{
      this.booking.updateTransactionStatus(id_user,this.id_booking,this.cboTransaction,notetxt).then(data=>{
        this.global.loading.dismiss();
        this.global.alertOK("Success","Transaction has been updated.");
        this.navCtrl.pop();
      }).catch(err=>{
        this.global.loading.dismiss();
        this.global.alertOK("Error","Connection Error " + err);
      });
    });
    //this.booking.updateTransactionStatus()


  }

  cboTransactionChange(){
    if(this.cboTransaction=="4"){
      this.id4 = true;
      this.id5 = false;
    }else if(this.cboTransaction=="5"){
      this.id4 = false;
      this.id5 = true;
    }else{
      this.id4 = false;
      this.id5 = false;
    }

  }
}
