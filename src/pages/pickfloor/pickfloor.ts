import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {PickrackPage} from '../pickrack/pickrack';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the PickfloorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickfloor',
  templateUrl: 'pickfloor.html',
})
export class PickfloorPage {
  //public loading;
  public id_dacen:string;
  public id_building:string;
  public floor:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restDacen:RestDacenProvider,
    public global:GlobalProvider  
  ) {
  }

  ionViewDidLoad() {
    this.id_dacen = this.navParams.get("id_dacen");
    this.id_building = this.navParams.get("id_building");
    this.global.showLoader("Loading");
    this.restDacen.listFloor(this.id_dacen,this.id_building).then(data=>{
      this.floor = data['data'];
      this.global.loading.dismiss();
    }).catch(err=>{
        console.log(err);
        this.global.showToast(err);
        this.global.loading.dismiss();
    });
    
    
  }

  viewRack(id_dacen:string,id_sector:string,id_floor:string){
    this.navCtrl.push(PickrackPage,{id_dacen:id_dacen,id_sector:id_sector,id_floor:id_floor});
  }

  toBack(){
    this.navCtrl.pop();
  }


  
 
}
