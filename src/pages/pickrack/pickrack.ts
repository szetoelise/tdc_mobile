import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
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
  public rack:any;
  public totalPay:number=0;
  public pickedClass=[]; 
  public pickedCondition=[];
  public pickedPrice=[];
  public invoice;
  public BaseURL:string;
  public floorMap:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider,
    private atrCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private global:GlobalProvider) {
      this.BaseURL = this.global.endpoint;

  }

  ionViewDidLoad() {
    //this.pickedClass[2] = 'rackchild';
    this.id_dacen = this.navParams.get("id_dacen");
    this.id_sector = this.navParams.get("id_sector");
    this.id_floor = this.navParams.get("id_floor");
    
    this.global.showLoader("Please Wait..");
    this.restDacen.mappingRack(this.id_dacen,this.id_sector,this.id_floor).then(data=>{
      this.global.loading.dismiss();
      this.floorMap = this.BaseURL + 'files/floor/' + data['floor_map'];
      this.rack = data['data'];
      let keyarr=[];
      let conditionarr=[];
      let pricearr=[];

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
        cd = data['data'][index].dacen_code + data['data'][index].sector_code + data['data'][index].floor_level;
      });
      this.invoice = cd;
      console.log(this.invoice);
      this.pickedClass = keyarr;
      this.pickedCondition = conditionarr;
      this.pickedPrice = pricearr;
      
      //console.log(this.rack);
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
    }else{
      this.pickedClass[id] = 'rackchild picked';
      this.pickedCondition[id] = true;
      this.totalPay += parseFloat(this.pickedPrice[id]);
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
        id_dacen:this.id_dacen,
        id_floor:this.id_floor,
        id_sector:this.id_sector,
        ids_rack:pickedArr,
        totalPay:this.totalPay,
        invoice:this.invoice
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
