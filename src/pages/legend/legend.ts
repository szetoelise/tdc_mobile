import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the LegendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-legend',
  templateUrl: 'legend.html',
})
export class LegendPage {
  public BaseURL:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider
    ) {
      this.BaseURL = this.global.endpoint + 'assets/images/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendPage');
  }

}
