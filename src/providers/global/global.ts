import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {LoadingController, AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public endpoint = "http://43.229.207.253/TelkomDC/";
  public loading;
  public Str:Storage;

  constructor(
    public storage:Storage,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) {
    console.log('Global Provider here...');
  }

saveStorage(key,value){
  this.storage.ready().then(() => {
    this.storage.set(key,value);
  });
}

getStorage(key){  
  let data;
  this.storage.ready().then(() => {
    this.storage.get(key).then((val) => {
      data =  val;
      return val;
    }).catch(err=>{
      data =  err;
    });    
  });  
  return data;
}

alertOK(title,subtitle){
  let alert = this.atrCtrl.create({
    title: title,
    subTitle: subtitle,
    buttons: ['OK']
  });
  alert.present();
}

showLoader(msg){
  this.loading = this.loadingCtrl.create({
    content: msg
  });
  this.loading.present();
}


showToast(msg,duration=3000,position="bottom",dismissOnPageChange=true) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: duration,
    position: position,
    dismissOnPageChange: dismissOnPageChange
  });

  toast.onDidDismiss(() => {
    //console.log('Dismissed toast');
  });

  toast.present();
}

}
