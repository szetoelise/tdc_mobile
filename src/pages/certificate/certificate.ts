import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the CertificatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certificate',
  templateUrl: 'certificate.html',
})
export class CertificatePage {
  public getCertificate:any;
  public id:string;
  public startDate:any;
  public minDate:any;
  public BaseURL:string;
  //public getCertificate:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dacen:RestDacenProvider,
    public global:GlobalProvider) {
      this.BaseURL = this.global.endpoint;
      this.startDate = new Date().toISOString();
      this.minDate = new Date().toISOString();
    }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.id = "1";
    console.log('ionViewDidLoad CertificatePage');
    this.dacen.listCertificateDacenById(this.id).then(data=>{
      this.getCertificate = data['data'];
    }).catch(err=>{});
  }

}
