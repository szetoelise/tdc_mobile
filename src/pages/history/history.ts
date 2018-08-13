import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddbookingPage} from '../addbooking/addbooking';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.topTab = 'booking';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  selectedTabChanged(evt)
  {
    
  }

  showAdd(){
    this.navCtrl.push(AddbookingPage);
  }
}
