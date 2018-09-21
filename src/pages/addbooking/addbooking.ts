import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {PickfloorPage} from '../../pages/pickfloor/pickfloor';
import {GlobalProvider} from '../../providers/global/global';
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
  private cboDatcenCat:any;
  private cboBuilding:any;
  private building:any;
  private dacen:any;
  private cboDacen:any;
  
  loading:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private global:GlobalProvider) {
  }

  ionViewDidLoad() {
    this.showLoader();
    this.restDacenCat.listCategory().then(data=>{
        this.dacenCat = data['data'];
        console.log(data);
      this.loading.dismiss();
    }).catch(data=>{
      this.presentToast("Koneksi anda terputus.");
    });


    

  }

//begin CBO changes
  datcenCatChange(){
    this.showLoader();
    this.restDacen.listDacenByCategory(this.cboDatcenCat)
    .then(data1=>{
        this.loading.dismiss();
        this.building = null;
        this.dacen = data1['data'];
    }).catch(err=>{
      this.presentToast("Koneksi anda terputus.");
    });
  }

  dacenChange(){
    this.getBuilding(this.cboDacen);
  }

  buildingChange(){

  }
//end CBO changes

//start button action
clickNext()
{
  if(!this.cboDacen){
    this.presentToast("Select Data Center first.")
    return false;
  }

  if(!this.cboBuilding){
    this.presentToast("Select Building first.")
    return false;
  }
  this.navCtrl.push(PickfloorPage,{id_dacen:this.cboDacen,id_building:this.cboBuilding});
}

//end button action



  getBuilding(id:string){
    this.showLoader();
    this.restDacen.listBuildingByDacen(id)
    .then(data => {
      console.log(data);
      this.loading.dismiss();
      this.building = data['data'];
    });
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

  toBack(){
    this.navCtrl.pop();
  }

}
