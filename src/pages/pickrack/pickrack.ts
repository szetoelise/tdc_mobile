import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
import {BookingProvider} from '../../providers/booking/booking';
import {GlobalProvider} from '../../providers/global/global';

import {AlacartePage} from '../alacarte/alacarte';
import {FloormapPage} from '../floormap/floormap';
import {LegendPage} from '../legend/legend';

//import {PickfloorPage} from '../../pages/pickfloor/pickfloor';
/**
 * Generated class for the PickrackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickrack',
  templateUrl: 'pickrack.html',
})
export class PickrackPage {
  public loading;
  public id_dacen:string;
  public id_sector:string;
  public id_floor:string;
  public id_booking;
  public rack:any;
  public id_rackstatus_current_lawas;
  public totalPay:number=0;
  public totalSetup:number=0;
  public id_rackstatus;
  public days_commit;

  public pickedClass=[]; 
  public pickedCondition=[];
  public pickedPrice=[];
  public pickedPriceSetup=[];
  public alacarteEdit=[];
  public invoice;
  public BaseURL:string;
  public floorMap:string;
  public isedit:boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private global:GlobalProvider,
    public booking:BookingProvider) {
      this.BaseURL = this.global.endpoint;
      this.id_dacen = this.navParams.get("id_dacen");
      this.id_sector = this.navParams.get("id_sector");
      this.id_floor = this.navParams.get("id_floor");
      this.id_booking = this.navParams.get("id_booking");
      this.id_rackstatus = this.navParams.get("id_rackstatus");
      this.days_commit = this.navParams.get("days_commit");


      if(this.id_booking == null || this.id_booking==""){
        this.isedit = false;
      }else{
        this.isedit = true;
      }
  }

  ionViewDidLoad() {
    //this.pickedClass[2] = 'rackchild';

    
    this.global.showLoader("Please Wait..");
    this.restDacen.mappingRack(this.id_dacen,this.id_sector,this.id_floor).then(data=>{
      
      this.floorMap = this.BaseURL + 'files/floor/' + data['floor_map'];
      this.rack = data['data'];
      let keyarr=[];
      let conditionarr=[];
      let pricearr=[];
      let priceSetuparr=[];
      let alacarteTemp=[];
      if(data['data']=="0"){
        this.global.alertOK("Rack","Data rack not found");
        this.navCtrl.pop();
        return false;
      }
      let cd:string;
      data['data'].forEach(function(key,index) {   
        //console.log(data['data'][index].rack_name);   
        keyarr[data['data'][index].id_rack] = 'rackchild';
        conditionarr[data['data'][index].id_rack] = false;
        pricearr[data['data'][index].id_rack] = data['data'][index].publish_price;
        priceSetuparr[data['data'][index].id_rack] = data['data'][index].setup_price;
        
        cd = data['data'][index].dacen_code + data['data'][index].sector_code + data['data'][index].floor_level;
      });

      if(this.isedit){
       
        this.booking.editBooking(this.id_booking).then(databooking=>{
          let totaltemp=0;
          let totalsetuptemp = 0;
          let id_rackstatus_current_lawas_temp;
          databooking['data'].rack.forEach(function(key_booking,index_booking) {
            if(databooking['data'].rack[index_booking].id_booking!=null){
              conditionarr[databooking['data'].rack[index_booking].id_rack] = true;
              keyarr[databooking['data'].rack[index_booking].id_rack] = 'rackchild picked';
              totaltemp += parseFloat(pricearr[databooking['data'].rack[index_booking].id_rack]);
              totalsetuptemp += parseFloat(priceSetuparr[databooking['data'].rack[index_booking].id_rack]);
              id_rackstatus_current_lawas_temp = databooking['data'].rack[index_booking].id_rackstatus_current;
            }
          });
          this.totalPay = totaltemp;
          this.totalSetup =totalsetuptemp;
          this.id_rackstatus_current_lawas = id_rackstatus_current_lawas_temp;
          databooking['data'].alacarte.forEach(function(key_booking,index_booking) {
            if(databooking['data'].alacarte[index_booking].id_booking!=null){
              alacarteTemp[databooking['data'].alacarte[index_booking].id_alacarte] = databooking['data'].alacarte[index_booking].id_alacarte;
            }
          });

        }).catch(err=>{
          console.log(err);
        });
        
      }

      this.invoice = cd;
      //console.log(this.invoice);
      this.pickedClass = keyarr;
      this.pickedCondition = conditionarr;
      this.alacarteEdit = alacarteTemp;
      this.pickedPrice = pricearr;
      this.pickedPriceSetup = priceSetuparr;

      //console.log(this.rack);
      this.global.loading.dismiss();      
    }).catch(err=>{
      this.global.loading.dismiss();
      console.log(err);
    });
  }

  clickRack(id:string){
    if(this.pickedCondition[id]){
      this.pickedClass[id] = 'rackchild';
      this.pickedCondition[id] = false;
      this.totalPay -= parseFloat(this.pickedPrice[id]);
      this.totalSetup -=parseFloat(this.pickedPriceSetup[id]);
    }else{
      this.pickedClass[id] = 'rackchild picked';
      this.pickedCondition[id] = true;
      this.totalPay += parseFloat(this.pickedPrice[id]);
      this.totalSetup +=parseFloat(this.pickedPriceSetup[id]);
    }
  }


  toBack(){
    this.navCtrl.pop();
  }

  viewNext(){
    let pickedArr = [];
    let arr = this.pickedCondition;
    arr.forEach(function(key,index) {
        if(arr[index]){
          pickedArr.push(index);
          //
        }
    });
    if(!pickedArr.length){
      this.global.showToast("Anda belum memilih rack");
      return false;
    }else{
      this.navCtrl.push(AlacartePage,{
        id_booking:this.id_booking,
        id_dacen:this.id_dacen,
        id_floor:this.id_floor,
        id_sector:this.id_sector,
        ids_rack:pickedArr,
        totalPay:this.totalPay,
        totalSetup:this.totalSetup,
        invoice:this.invoice,
        alacarteEdit:this.alacarteEdit,
        id_rackstatus_current:this.id_rackstatus,
        id_rackstatus_current_lawas:this.id_rackstatus_current_lawas,
        days_commit:this.days_commit
        
      })
    }
  }

  showMap(img){
    this.navCtrl.push(FloormapPage,{file:img});
  }

  showLegend(){
    this.navCtrl.push(LegendPage);
  }
}
