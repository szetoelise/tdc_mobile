import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';

import { NavController,IonicPage, LoadingController,NavParams,MenuController} from 'ionic-angular';
//import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
import {DiagrampowerPage} from '../diagrampower/diagrampower';
import {ConnectivityPage} from '../connectivity/connectivity';
import {BuildingPage} from '../building/building';
import {CertificatePage} from '../certificate/certificate';
/**
 * Generated class for the DatacenterdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datacenterdetail',
  templateUrl: 'datacenterdetail.html',
})
export class DatacenterdetailPage {
  public id:string;
  public dacenimg;
  public dacendesc;
  public dacenname;
  public datacenter;
  public dacenlocdetail;
  public lat;
  public lng;
  public apiKey;
  public map: GoogleMap;
  public baseURL:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dacen:RestDacenProvider,
    public global:GlobalProvider) {
    this.id = navParams.get("id");
    //this.id="1";
  }

  loadMap(lat,lng) {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: lat,
           lng: lng
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Data Center',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: lat,
        lng: lng
      }
    });
    //marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //  alert('clicked');
    //});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DatacenterdetailPage');
    this.global.showLoader("Please wait..");
    this.dacen.detailById(this.id).then(data=>{
      this.baseURL = this.global.endpoint;
      this.datacenter = data['data'][0];
      this.dacenimg = this.baseURL + "files/dc/" + data['data'][0]['dacen_img'];
    
      this.dacendesc = data['data'][0]['dacen_desc'];
      this.dacenname = data['data'][0]['dacen_name'];
      this.dacenlocdetail = data['data'][0]['dacen_locdetail'];
      this.lat = data['data'][0]['dacen_lat'];
      this.lng = data['data'][0]['dacen_long'];
      //this.apiKey = this.global.apiKey;
      this.loadMap(data['data'][0]['dacen_lat'],data['data'][0]['dacen_long'])
      this.global.loading.dismiss();
    }).catch(err=>{
      this.global.loading.dismiss();
      //console.log(err);
    })
    //alert(this.id);
  }

  viewCertificate(){
    this.navCtrl.push(CertificatePage,{id:this.id});
  }

  viewDiagramPower(){
    this.navCtrl.push(DiagrampowerPage,{id:this.id});
  }

  viewConnectivity(){
    this.navCtrl.push(ConnectivityPage,{id:this.id});
  }

  viewBuilding(){
    this.navCtrl.push(BuildingPage,{id:this.id});
  }
}
