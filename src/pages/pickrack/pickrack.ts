import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';

//import {PickfloorPage} from '../../pages/pickfloor/pickfloor';
/**
 * Generated class for the PickrackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickrack',
  templateUrl: 'pickrack.html',
})
export class PickrackPage {
  public loading;
  public id_dacen:string;
  public id_sector:string;
  public id_floor:string;
  public rack:any;
  public pickedClass:Array<string> = new Array(); 
  public BaseURL:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private global:GlobalProvider) {
      this.BaseURL = this.global.endpoint;
  }

  ionViewDidLoad() {
    //this.pickedClass[2] = 'rackchild';
    this.id_dacen = this.navParams.get("id_dacen");
    this.id_sector = this.navParams.get("id_sector");
    this.id_floor = this.navParams.get("id_floor");
    this.showLoader();
    this.restDacen.mappingRack(this.id_dacen,this.id_sector,this.id_floor).then(data=>{
      this.loading.dismiss();
      this.rack = data['data'];
      data['data'].forEach(function(key,index) {      
        this.pickedClass[data['data'][index].rack_name] = 'rackchild';
      });

     
      //console.log(this.rack);
    }).catch(err=>{
      console.log(err);
    });
  }

  clickRack(id:string){
    alert(id);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  
    this.loading.present();
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
