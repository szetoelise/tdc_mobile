import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';

/**
 * Generated class for the EditbookingstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editbookingstatus',
  templateUrl: 'editbookingstatus.html',
})
export class EditbookingstatusPage {
  public id_rackstatus_current:any;
  public commit:boolean;
  public id_booking:any;
  public commitday:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider
    ) {
    this.id_rackstatus_current = this.navParams.get("id_rackstatus");
    this.id_booking = this.navParams.get("id_booking");
    this.commitday = this.navParams.get("days_commit");
    this.rackStatusChange();
  }

  rackStatusChange(){
    if(this.id_rackstatus_current=='3'){
      this.commit=true;
    }else{
      this.commit=false;
    }
    //console.log(this.id_rackstatus_current);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditbookingstatusPage');
  }

  toBack(){
    this.navCtrl.pop();

  }

  submitUpdateCommit(){
    if(this.id_rackstatus_current=='3'){
      if(this.commitday==null || this.commitday==""){
          this.global.alertOK("Error","Commit days cannot be empty");
          return false;
      }
    }else{
      this.commitday = null;
    }

    this.global.showLoader("Please wait...");
    this.global.storage.get("id_user").then(id_user=>{
      this.booking.updateStatusCommit(id_user,this.id_booking,this.id_rackstatus_current,this.commitday).then(data=>{
        this.global.loading.dismiss();
        this.global.alertOK("Succes","Status Booking successfully Update");
        this.navCtrl.pop();
        
      }).catch(err=>{
        this.global.alertOK("Error","Connection Error" + err);
        this.global.loading.dismiss();
      });
    });


  }
}
