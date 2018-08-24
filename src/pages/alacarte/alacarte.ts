import { Component } from '@angular/core';
import { Content ,IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {AlacarteProvider} from '../../providers/alacarte/alacarte';
import { ViewChild ,ElementRef } from '@angular/core'
import {GlobalProvider} from '../../providers/global/global';
import {FormcustomerPage} from '../formcustomer/formcustomer';
import { first } from 'rxjs/operators';
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
  @ViewChild(Content, {read: ElementRef}) content: Content;
  public id_rackstatus_current;
  public commitday;
  public commit:boolean=false;
  public alacarteType;
  public alacarte;
  
  public id_alacartetype=[];
  public id_alacartetype_detect=[];
  
  public pickedArr = [];
  public id_alacarte=[];
  public id_alacarte_detect=[];
  
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
      this.totalPay = parseFloat(this.navParams.get("totalPay"));
      this.ids_rack = this.navParams.get("ids_rack");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlacartePage');
    this.listType();
    this.id_rackstatus_current= 4;
      // var container = document.getElementsByClassName('detailbody');
      // for(var x = 0; x < container.length; x++) {
      //   var imgx = container.item(x).getElementsByTagName("img");
      //   for(var xx = 0; xx < imgx.length; xx++) {
      //     imgx[xx].addEventListener('click', (event) => 
      //     {
      //       var url = event.toElement.getAttribute('src');
      //       var title = event.toElement.getAttribute('alt');
            
      //     }
      //     );
      //   }
      // }
      //this.id_alacartetype_detect = this.id_alacartetype;
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
         let x:number=0;
          data['data'][index].alacarte.forEach(function(key1,index1){
            if(x==1){
              keyarr[data['data'][index].id_alacartetype] =data['data'][index].alacarte[index1].id_alacarte;
            }
            priceArr[data['data'][index].alacarte[index1].id_alacarte] =data['data'][index].alacarte[index1].price;
            x++;
          });
        //priceArr[data['data'][index].id_alacartetype] = 
      });
      this.priceType = priceArr;

      this.id_alacartetype = keyarr;
      //console.log(keyarr);
      //console.log(this.id_alacartetype);
      //console.log(keyarr);
      
      this.alacarteType = data['data'];
        //--------------
        this.restAlacarte.listAll().then(data1=>{
          let keyarr1=[];
          let priceArr1=[];
          data1['data'].forEach(function(key,index) {               
            //keyarr1.push(data1['data'][index].id_alacarte);
              data1['data'][index].alacarte.forEach(function(key1,index1){
                keyarr1[data1['data'][index].alacarte[index1].id_alacarte] ="0";
                priceArr1[data1['data'][index].alacarte[index1].id_alacarte] =data1['data'][index].alacarte[index1].price;
              });
          });

          this.priceAl = priceArr1;
          this.id_alacarte=keyarr1;
          //console.log(this.priceAl);
          this.length_id_alacarte = keyarr1;

          this.alacarte = data1['data'];
          
          this.firstRun();

          this.loading.dismiss();
        }).catch(err1=>{
          this.loading.dismiss();
          console.log(err1);
        });
       

        

        //--------------      
      //this.loading.dismiss();
    }).catch(err=>{
      
      console.log(err);
    });

   
     
    

  }

  ionViewDidEnter(){
    //console.log("enter");

   
    //if(!this.id_alacartetype_detect[parent_id]){
    //  this.id_alacartetype_detect[parent_id] = this.id_alacartetype[parent_id];
    //}
  }


 firstRun(){
  let id_alacartetype_temp=[];
  let id_alacarte_temp=[];
  
  let pricetype_temp = [];
  let init_pay = 0;
  let id_alacartetype_detect_temp=[];
  let id_alacarte_detect_temp=[];

  let statusempty:boolean=false;

  if(id_alacartetype_detect_temp.length==0){
    statusempty = true;
  }else{
    statusempty = false;
  }

  id_alacartetype_temp = this.id_alacartetype;
  pricetype_temp = this.priceType;

  this.id_alacartetype.forEach(function(key1,index1){
      init_pay += parseFloat(pricetype_temp[id_alacartetype_temp[index1]]);
      if(statusempty) {
      id_alacartetype_detect_temp[index1] = id_alacartetype_temp[index1];
      }
  });
  this.totalPay += init_pay;
  id_alacarte_temp = this.id_alacarte;
  //console.log(this.id_alacarte);
  this.id_alacarte.forEach(function(key1,index1){
    id_alacarte_detect_temp[index1] = id_alacarte_temp[index1];
    //console.log(id_alacarte_temp[index1]);
  });
  this.id_alacarte_detect = id_alacarte_detect_temp;
 
    //if(!this.id_alacarte_detect[id_al]){
    //   this.id_alacarte_detect[id_al] = this.id_alacarte[id_al];
    // }

 }



 priceAlacarte(id_al){

  // if(!this.id_alacarte_detect[id_al]){
  //   this.id_alacarte_detect[id_al] = this.id_alacarte[id_al];
  // }

  if(this.id_alacarte[id_al]==this.id_alacarte_detect[id_al]){
    return false;
  }else{
    if(this.id_alacarte[id_al]=="0"){
      this.totalPay -= parseFloat(this.priceAl[id_al]);
      this.id_alacarte_detect[id_al] = "0";
    }else{
      this.totalPay += parseFloat(this.priceAl[id_al]);
      this.id_alacarte_detect[id_al] =this.id_alacarte[id_al]; 
      //alert(this.priceAl[id_al]);
    }
  }
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


  
  priceAlacarteType(first_id,second_id,parent_id){

    if(this.id_alacartetype[parent_id]==this.id_alacartetype_detect[parent_id]){
        //no changes
        return false;
    }else{
       //changes has given
       this.id_alacartetype_detect[parent_id] = this.id_alacartetype[parent_id];
    }

    if(this.id_alacartetype[parent_id]==first_id){
        this.totalPay += parseFloat(this.priceType[first_id]);
        this.totalPay -= parseFloat(this.priceType[second_id]);
 
      }else{
        this.totalPay -= parseFloat(this.priceType[first_id]);
        this.totalPay += parseFloat(this.priceType[second_id]);
    }
    
  }

  doSubmit(){
    //let l = this.length_id_alacarte;
    //this.length_id_alacarte.forEach(function(key,index){
        //console.log(index);
    //});

    if(!this.id_rackstatus_current){
      this.presentToast("Select one of Booking Commit Type option.");
      return false;
    }
    //console.log(this.id_alacartetype);
    //console.log(this.id_alacarte);
    if(!this.commitday){
      this.commitday =0;       
    }
   
      this.navCtrl.push(FormcustomerPage,{
        id_dacen:this.id_dacen,
        id_floor:this.id_floor,
        id_sector:this.id_sector,
        ids_rack:this.ids_rack,
        totalPay:this.totalPay,
        alacarteType:this.id_alacartetype,
        alacarte:this.id_alacarte,
        id_rackstatus_current:this.id_rackstatus_current,
        commitdays:this.commitday
      });

  }
}
