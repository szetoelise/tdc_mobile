import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';
import {HomePage} from '../home/home';


/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  public data;
  public dacenname;
  public totalrack;
  public rackstatus;
  public totalPay;
  public racks;
  public requestPay;
  public spec_rack;
  public alacarte_names;
  public id_booking

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public book:BookingProvider
  ) {
    this.id_booking = this.navParams.get("id_booking");
  }

  ionViewDidLoad() {

    //console.log('ionViewDidLoad SummaryPage');
    this.global.showLoader("Please Wait...");
    this.book.historyRack(this.id_booking).then(data=>{
        let result = data['data'];
        this.totalrack = data['total_rack'];
        this.data = result;
        this.dacenname = this.data.dacen[0].dacen_name;
        this.rackstatus = this.data.rack[0].rackstatus;
        this.totalPay = this.data.users[0].total_price;
        this.requestPay = this.data.users[0].price_request;
        this.spec_rack = this.data.spec_rack[0].spec_detail;

        let r = this.data.rack;
        let a = 0;
        let rtemp = '';
        this.data.rack.forEach(function(key,index){
          if(a > 0){
            rtemp += ", ";
          }
          rtemp +=r[index].rack_name;
          a++;
        });
        this.racks = rtemp;

        let r1 = this.data.rack[0].alacarte;
        let a1 = 0;
        let rtemp1 = '';        
        this.data.rack[0].alacarte.forEach(function(key,index){
          if(a1 > 0){
            rtemp1 += ", ";
          }
          rtemp1 +=r1[index].alacarte_name;
          a1++;
        });
        this.alacarte_names = rtemp1;
        this.global.loading.dismiss();
        //console.log();
    }).catch(err=>{
      this.global.showToast(err);
      this.global.loading.dismiss();
    });
    
  }

  doFinish(){
    this.navCtrl.setRoot(HomePage);
  }

}
