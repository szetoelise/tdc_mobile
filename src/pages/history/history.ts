import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddbookingPage} from '../addbooking/addbooking';
import {VisitProvider} from '../../providers/visit/visit';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  topTab: any;
  visitAll:any;
  bookingAll:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public visit:VisitProvider) {
    this.topTab = 'booking';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.visit.listAll().then(data=>{
      this.visitAll = data['data'];
      //console.log(data);
    }).catch(err=>{
      console.log(err);
    });

    this.visit.listAllBookingRack().then(data=>{
      this.bookingAll = data['data'];
    }).catch(err=>{

    });
  }

  selectedTabChanged(evt)
  {
    
  }

  showAdd(){
    this.navCtrl.push(AddbookingPage);
  }
}
