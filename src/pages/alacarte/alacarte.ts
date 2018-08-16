import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {AlacarteProvider} from '../../providers/alacarte/alacarte';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the AlacartePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alacarte',
  templateUrl: 'alacarte.html',
})
export class AlacartePage {
  public id_rackstatus_current;
  public commit:boolean=false;
  public alacarteType;
  public alacarte;
  
  public id_alacartetype=[];
  
  public id_alacarte={};
  public post_id_alacarte=[];
  public length_id_alacarte=[];

  public priceType=[];
  public priceAl=[];

  public checked=true;

  public id_dacen:string;
  public id_sector:string;
  public id_floor:string;
  public totalPay:number=0;
  public ids_rack;

  loading:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restAlacarte:AlacarteProvider,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) {
      this.id_dacen = this.navParams.get("id_dacen");
      this.id_sector = this.navParams.get("id_sector");
      this.id_floor = this.navParams.get("id_floor");
      this.totalPay = this.navParams.get("totalPay");
      this.ids_rack = this.navParams.get("ids_rack");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlacartePage');
    this.listType();
  }

  rackStatusChange(){
    if(this.id_rackstatus_current=='3'){
      this.commit=true;
    }else{
      this.commit=false;
    }
    //console.log(this.id_rackstatus_current);
  }

  listType(){
    this.showLoader();
    this.restAlacarte.listType().then(data=>{
      let keyarr=[];
      let priceArr=[];

      data['data'].forEach(function(key,index) {   
        keyarr[data['data'][index].id_alacartetype] =null;
          data['data'][index].alacarte.forEach(function(key1,index1){
            priceArr[data['data'][index].alacarte[index1].id_alacarte] =data['data'][index].alacarte[index1].price;
          });
        //priceArr[data['data'][index].id_alacartetype] = 
      });
      this.priceType = priceArr;
      this.id_alacartetype = keyarr;
      this.alacarteType = data['data'];
        //--------------
        this.restAlacarte.listAll().then(data1=>{
          let keyarr1=[];
          let priceArr1=[];
          data1['data'].forEach(function(key,index) {   
            keyarr1[data1['data'][index].id_alacarte] =0;
            //keyarr1.push(data1['data'][index].id_alacarte);
              data1['data'][index].alacarte.forEach(function(key1,index1){
                priceArr1[data1['data'][index].alacarte[index1].id_alacarte] =data1['data'][index].alacarte[index1].price;
              });
          });

          this.priceAl = priceArr1;
          this.id_alacarte=keyarr1;
          this.length_id_alacarte = keyarr1;

          this.alacarte = data1['data'];
          this.loading.dismiss();
        }).catch(err1=>{
          this.loading.dismiss();
          console.log(err1);
        });
        console.log(this.priceType);
        console.log(this.priceAl);
        

        //--------------      
      //this.loading.dismiss();
    }).catch(err=>{
      
      console.log(err);
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

  testInput(){
    console.log(this.id_alacartetype);
  }

  toBack(){
      this.navCtrl.pop();
  }

  priceAlacarte(){

  }

  priceAlacarteType(){

  }

  doSubmit(){
    let l = this.length_id_alacarte;
    this.length_id_alacarte.forEach(function(key,index){
        console.log(l[index]);
    });
    console.log(this.id_alacarte);
  }
}
