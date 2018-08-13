import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';

/**
 * Generated class for the AddbookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbooking',
  templateUrl: 'addbooking.html',
})
export class AddbookingPage {
  private dacenCat:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbookingPage');
    this.restDacenCat.listCategory().then(data=>{
        this.dacenCat = data['data'];
    }).catch(data=>{

    });
  }

}
