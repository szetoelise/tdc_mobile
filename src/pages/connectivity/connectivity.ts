import { Component } from '@angular/core';
import { NavController,IonicPage, LoadingController,NavParams,MenuController, AlertController, ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the ConnectivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connectivity',
  templateUrl: 'connectivity.html',
})
export class ConnectivityPage {
  dacen:any;
  dacenname:string;
  loading;
  id:string;
  connectivity:string;
  isLoading:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    public loadingCtrl: LoadingController,
    public global:GlobalProvider,
    private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectivityPage');
   
    this.id = this.navParams.get("id");
    this.getDacen(this.id);
  }
  
  getDacen(id:string){
    this.showLoader();
    this.isLoading=true;
    this.restDacen.detailById(id)
    .then(data => {
      this.isLoading=false;
      this.loading.dismiss();
      this.dacen = data['data'];
      console.log(this.dacen);      
      this.connectivity = this.global.endpoint + "files/connectivity/" + this.dacen[0].dacen_connectivity;
      this.dacenname = this.dacen.dacen_name;
      //console.log(this.dacen[0].dacen_diagrampower);
    }).catch(err=>{
      console.log(err);
    });;
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  showZoom(){
    this.photoViewer.show(this.connectivity, this.dacen.dacen_name);
  }
}
