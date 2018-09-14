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
  //public endpoint = "http://localhost/TelkomDC/";
  public endpoint = 'https://telkomsigmadatacenter.id/';
  
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

checkEmail(email:string){
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email)) {
    return false;
  }else{
    return true;
  }
}


rackStatus(id_rackstatus,id_role){
  if(!id_rackstatus){
    id_rackstatus = 0;
  }
  id_rackstatus = parseInt(id_rackstatus);
  id_role = parseInt(id_role);
  
  if(id_rackstatus==3 && id_role==3){
    return "<span class='font_blue'>Committed</span>";
  }else if(id_rackstatus==3 && id_role==4){
    return "<span class='font_blue'>Committed</span>";
  }else if(id_rackstatus==3 && id_role!=3){
    return "<span class='font_blue'>Committed</span>";
  }else if(id_rackstatus==3 && id_role!=4){
    return "<span class='font_blue'>Committed</span>";
  }else if(id_rackstatus==4 && id_role==3){
    return "<span class='font_orange'>Uncommitted</span>";
  }else if(id_rackstatus==4 && id_role==4){
    return "<span class='font_orange'>Uncommitted</span>";
  }else if(id_rackstatus==4 && id_role!=3){
    return "<span class='font_orange'>Uncommitted</span>";
  }else if(id_rackstatus==4 && id_role!=4){
    return "<span class='font_orange'>Uncommitted</span>";
  }else if(id_rackstatus==2){
    return "<span class='font_red'>Cancel</span>";
  }else if(id_rackstatus==1){
    return "<span class='font_green'>Occupied green</span>";
  }else if(id_rackstatus==0){
    return "-";
  }
}

statustransaksi(id_statustransaksi){
  id_statustransaksi = parseInt(id_statustransaksi);
  if(id_statustransaksi==1){
    return "<span class='font_blue'>Initiate</span>";
  }else if(id_statustransaksi==2){
    return "<span class='font_green'>Proposal</span>";
  }else if(id_statustransaksi==3){
    return "<span class='font_purple'>Negotiation</span>";
  }else if(id_statustransaksi==4){
    return "<span class='font_orange'>Deal</span>";
  }else if(id_statustransaksi==5){
    return "<span class='font_red'>Drop</span>";
  }else{
    return "-";
  }
}

}
