import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';
/**
 * Generated class for the DetailbookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailbooking',
  templateUrl: 'detailbooking.html',
})
export class DetailbookingPage {
public data:any;
public users:any={
  customer_name:null,
  customer_address:null,
  date_commit:null,
  days_commit:  null,
  email:null,
  emp_name:null,
  id_booking:null,
  id_invoice:null,
  id_statustransaksi:null,
  id_user:null,
  nik:null,
  no_tlpn:null,
  note:null,
  note_additional:null,
  price_request:null,
  publish_price:null,
  qty:null,
  request_date:null,
  setup_price:null,
  status_transaksi:null,
  status_visit:null,
  total_price:null,
  validator:null,
  validator_email:null,
  validator_notlpn:null,
  validator_suggest:null

};
public rack:any={
  dacen_name:null,
id_booking:null,
id_rack:null,
id_rack_booking:null,
publish_price:null,
rack_name:null,
rackstatus:null,
setup_price:null,
spec_detail:null
}
public racks;
public alacarte_names;
public id_booking;
public spec_rack;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider
  ) {
    this.id_booking = this.navParams.get("id_booking");
    //this.id_booking = 279;
  }

  ionViewDidLoad() {
    this.global.showLoader("Please wait..");
    this.global.storage.get("id_user").then(id_user=>{
      this.global.storage.get("id_role").then(id_role=>{
        this.booking.historyRack(this.id_booking,id_user,id_role).then(data=>{
          this.data = data['data'];
          let users_temp = data['data'].users[0];
          //this.users.customer_name =users_temp.customer_name;
          //this.users.customer_address = users_temp.customer_address;
          this.users = users_temp;
          this.rack = data['data'].rack[0];
          this.spec_rack = data['data'].spec_rack[0].spec_detail;
          //Get rack name
          let r = data['data'].rack;
          let a = 0;
          let rtemp = '';
          data['data'].rack.forEach(function(key,index){
            if(a > 0){
              rtemp += ", ";
            }
            rtemp +=r[index].rack_name;
            a++;
          });
          this.racks = rtemp;
          //Get rack spec
          let r1 = data['data'].rack[0].alacarte;
          let a1 = 0;
          let rtemp1 = '';        
          data['data'].rack[0].alacarte.forEach(function(key,index){
            if(a1 > 0){
              rtemp1 += "\n ";
            }
            rtemp1 +=r1[index].alacarte_name;
            a1++;
          });
          this.alacarte_names = rtemp1;

          console.log(this.data);
          this.global.loading.dismiss();
        }).catch(err=>{
          this.global.loading.dismiss();
        })
      });
    });
    
  }

}
