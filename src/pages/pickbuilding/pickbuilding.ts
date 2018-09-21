import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams,MenuController, AlertController, ToastController } from 'ionic-angular';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import 'rxjs/add/operator/map';
import {Observable,Subject} from 'rxjs/Rx';
import {PickfloorPage} from '../../pages/pickfloor/pickfloor';
//import {DatacenterdetailPage} from '../datacenterdetail/datacenterdetail';
//import {PickbuildingPage} from '../pickbuilding/pickbuilding';

/**
 * Generated class for the PickbuildingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickbuilding',
  templateUrl: 'pickbuilding.html',
})
export class PickbuildingPage {
  private dacen:any;
  private id_dacen:string;
  private loading;
  private building;
  private cboBuilding;

  private BaseURL:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacen:RestDacenProvider,
    public loadingCtrl: LoadingController,
    public global:GlobalProvider,
    private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {

    this.global.storage.ready().then(()=>{
      this.global.storage.get("id_role").then(id_role=>{
        console.log(id_role + "test");
        if(id_role=="2"){
          this.BaseURL = this.global.endpoint;
          this.id_dacen = this.navParams.get("id_dacen");
          console.log('ionViewDidLoad PickbuildingPage');
          this.showLoader();
          this.restDacen.detailById(this.id_dacen).then(data=>{
            this.dacen = data['data'];
            this.getBuilding(this.id_dacen);
          }).catch(err=>{
            this.loading.dismiss();
            console.log(err);
          });  
        }else{
          this.global.alertOK("Invalid Role","Please Login as Requester");
          this.navCtrl.pop();
        }
  
  
  
      })
    })


  }


  getBuilding(id:string){
    //this.showLoader();
    this.restDacen.listBuildingByDacen(id)
    .then(data => {
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

  buildingChange(){

  }


  clickNext()
{
 

  if(!this.cboBuilding){
    this.presentToast("Select Building first.")
    return false;
  }
  this.navCtrl.push(PickfloorPage,{id_dacen:this.id_dacen,id_building:this.cboBuilding});
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
