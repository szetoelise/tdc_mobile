import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the BuildingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingPage {
  public building;
  public id;
  public building_detail;
  public building_img;  
  public building_maps;
  public building_name; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public dacen:RestDacenProvider
    ) {
      this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingPage');
    this.global.showLoader("Please Wait...");
    this.dacen.detailById(this.id).then(data=>{
      this.building = data['building'][0];
      
      this.building_detail = this.building.building_detail;
      this.building_name = this.building.building_name;
      this.building_img = this.global.endpoint + "files/building/" +  this.building.building_img;
      this.building_maps = this.global.endpoint + "files/maps/" +  this.building.building_maps;
      
      this.global.loading.dismiss();
    }).catch(err=>{
      this.global.loading.dismiss();
      this.global.alertOK("Error","Data not found.");
    });
  }
  
  
  
}
