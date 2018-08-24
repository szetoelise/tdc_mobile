import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';
import {SummaryPage} from '../summary/summary';
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
  
  public id_dacen:string;
  public id_sector:string;
  public id_floor:string;
  public totalPay:number=0;
  public ids_rack;
  public id_alacartetype:any;
  public id_rackstatus_current:any;
  public id_alacarte:any;
  public commitdays;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private global:GlobalProvider,
    private booking:BookingProvider) {

      this.id_dacen = this.navParams.get("id_dacen");
      this.id_sector = this.navParams.get("id_sector");
      this.id_floor = this.navParams.get("id_floor");
      this.totalPay = parseFloat(this.navParams.get("totalPay"));
      this.ids_rack = this.navParams.get("ids_rack");
      this.id_alacartetype = this.navParams.get("alacarteType");
      this.id_alacarte = this.navParams.get("alacarte");
      this.commitdays = parseInt(this.navParams.get("commitdays"));
      this.id_rackstatus_current = this.navParams.get("id_rackstatus_current");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormcustomerPage');
  }
  toBack(){
    this.navCtrl.pop();
  }
  


  doSubmit()
  {
    if(!this.am){
      this.global.showToast("AM Reference input column cannot be empty.");
      return false;
    }

    if(!this.company){
      this.global.showToast("Company Name / Client input column cannot be empty.");
      return false;
    }

    if(!this.city){
      this.global.showToast("City of company input column cannot be empty.");
      return false;
    }

    if(!this.price){
      this.global.showToast("Price input column cannot be empty.");
      return false;
    }

    this.global.showLoader("Please Wait...");
    let data = {};
    let postString = "id_rackstatus_current=" + this.id_rackstatus_current;
    data['id_rackstatus_current'] = this.id_rackstatus_current;

    let ids_rack_temp = this.ids_rack;
    let a = 0;
    this.ids_rack.forEach(function(key,index){
      postString +="&id_rack["+index+"]=" + ids_rack_temp[index];
      a++;
    });
      postString +="&days_commit=" + this.commitdays;
    let id_alacarteType_temp = this.id_alacartetype;
    this.id_alacartetype.forEach(function(key,index){
      postString +="&id_alacarte[]="  + id_alacarteType_temp[index];
    });

    let id_alacarte_temp = this.id_alacarte;
    this.id_alacarte.forEach(function(key,index){
      if(parseInt(id_alacarteType_temp[index]) > 0) {
        postString +="&id_alacarte[]="  +index;
      }
    });
    postString +="&validator=" + this.am;
    postString +="&customer_name=" + this.company;
    postString +="&customer_address=" + this.city;
    postString +="&price_request=" + this.price;
    
    this.global.storage.ready().then(()=>{
      this.global.storage.get("id_user").then(id_user=>{
        postString +="&id_user=" + id_user;
        this.booking.saveBooking(postString).then(datareturn=>{
          this.global.loading.dismiss();
          this.navCtrl.push(SummaryPage,{id_booking:datareturn['id_booking']});
          //console.log(datareturn['id_booking']);

        }).catch(err=>{
          console.log(err);
        });
      })
    })
    
    


  }
}
