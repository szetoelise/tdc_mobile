import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the FloormapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-floormap',
  templateUrl: 'floormap.html',
})
export class FloormapPage {
  public floorMap;
  constructor(public navCtrl: NavController, public navParams: NavParams,private photoViewer: PhotoViewer) {
    this.floorMap = this.navParams.get("file");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FloormapPage');
  }
  showZoom(){
    this.photoViewer.show(this.floorMap, "Floor Map");
  }
}
