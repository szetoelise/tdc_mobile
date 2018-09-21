import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';
import {SummaryPage} from '../summary/summary';
/**
 * Generated class for the FormcustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formcustomer',
  templateUrl: 'formcustomer.html',
})
export class FormcustomerPage {
  public am:any;
  public company:any;
  public city:any;
  public price:any;
  
  public id_dacen:string;
  public id_sector:string;
  public id_floor:string;
  public totalPay:number=0;
  public ids_rack;
  
  public id_rack_edit;
  public id_alacarte_edit;

  public id_alacartetype:any;
  public id_booking;
  public id_rackstatus_current_lawas;
  public id_rackstatus_current:any;
  public id_alacarte:any;
  public commitdays;
  public note_additional;
  public invoice;

  public editData;

  public isedit:boolean=false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private global:GlobalProvider,
    private booking:BookingProvider) {
     
      this.id_dacen = this.navParams.get("id_dacen");
      this.id_sector = this.navParams.get("id_sector");
      this.id_floor = this.navParams.get("id_floor");
      this.id_rackstatus_current_lawas = this.navParams.get("id_rackstatus_current_lawas");
      this.ids_rack = this.navParams.get("ids_rack");
      this.id_alacartetype = this.navParams.get("alacarteType");
      this.id_alacarte = this.navParams.get("alacarte");
      this.commitdays = parseInt(this.navParams.get("commitdays"));
      this.id_rackstatus_current = this.navParams.get("id_rackstatus_current");
      this.note_additional = this.navParams.get("note_additional");
      this.invoice = this.navParams.get("invoice");
      this.id_booking = this.navParams.get("id_booking");
      if(this.id_booking==null || this.id_booking==""){
        this.isedit = false;
      }else{
        this.isedit = true;
      }
      console.log(this.id_alacarte);
  }


  ionViewDidLoad() {
    this.totalPay = 0;
    this.totalPay = parseFloat(this.navParams.get("totalPay"));
    if(this.isedit){
      this.global.showLoader("Please wait..");
      this.booking.editBooking(this.id_booking).then(data=>{
        let d = data['data'].users[0];
        this.editData = d;
        console.log(data);
        this.am = d.validator_suggest;
        this.city = d.customer_address;
        this.price = d.price_request;
        this.company = d.customer_name;
        this.global.loading.dismiss();
      }).catch(err=>{
        this.global.loading.dismiss();
        this.global.alertOK("Error","Connection Error" + err);
      });
    }
  }
  toBack(){
    this.navCtrl.pop();
  }
  


  doSubmit()
  {



    if(!this.am){
      //this.global.alertOK("Error Input","AM Reference input column cannot be empty.");
      //return false;
    }

    if(!this.company){
      this.global.alertOK("Error Input","Company Name / Client input column cannot be empty.");
      return false;
    }

    if(!this.city){
      this.global.alertOK("Error Input","City of company input column cannot be empty.");
      return false;
    }

    if(!this.price){
      this.global.alertOK("Error Input","Price input column cannot be empty.");
      return false;
    }

    this.global.showLoader("Please Wait...");
    let data = {};
    let postString = "id_rackstatus_current=" + this.id_rackstatus_current;
    data['id_rackstatus_current'] = this.id_rackstatus_current;

    let ids_rack_temp = this.ids_rack;
    let a = 0;
    let id_rack_edit_temp=[];
    this.ids_rack.forEach(function(key,index){
      postString +="&id_rack["+index+"]=" + ids_rack_temp[index];
      id_rack_edit_temp[index] = ids_rack_temp[index];
      a++;
    });
    this.id_rack_edit = id_rack_edit_temp;
      postString +="&days_commit=" + this.commitdays;
    //let id_alacarteType_temp = this.id_alacartetype;
    //this.id_alacartetype.forEach(function(key,index){
    //  postString +="&id_alacarte[]="  + id_alacarteType_temp[index];
    //});

    let id_alacarte_temp = this.id_alacarte;
    let i:number = 0;
    let id_alacarte_edit_temp=[];
    
    this.id_alacarte.forEach(function(key,index){
      //if(parseInt(id_alacarteType_temp[index]) > 0) {
        if(index==null || index==""){}else{
          if(id_alacarte_temp[index]==true){
          postString +="&id_alacarte[]="  +index;
          id_alacarte_edit_temp[i] =index;
          i++;
          }
        }
        
      //}
    });
    this.id_alacarte_edit = id_alacarte_edit_temp;
    postString +="&validator=" + this.am;
    postString +="&customer_name=" + this.company;
    postString +="&customer_address=" + this.city;
    postString +="&price_request=" + this.price;
    postString +="&note_additional=" + this.note_additional;
    postString +="&invoice=" + this.invoice;
    
    
    
    if(!this.isedit){
      this.global.storage.ready().then(()=>{
        this.global.storage.get("id_user").then(id_user=>{
          postString +="&id_user=" + id_user;
          this.booking.saveBooking(postString).then(datareturn=>{
            this.global.loading.dismiss();
            this.navCtrl.push(SummaryPage,{id_booking:datareturn['id_booking']});
            //console.log(datareturn['id_booking']);
  
          }).catch(err=>{
            this.global.loading.dismiss();
            this.global.alertOK("Error Sending Data",err);
            //console.log(err);
          });
        })
      })     
    }else{
      this.global.storage.ready().then(()=>{
        this.global.storage.get("id_user").then(id_user=>{
          postString +="&id_user=" + id_user;
          postString +="&id_user_ubah=" + this.editData.id_user;
          postString +="&validator=" + this.am;
          postString +="&customer_name=" + this.company;
          postString +="&customer_address=" + this.city;
          postString +="&price_request=" + this.price;
          postString +="&note_additional=" + this.note_additional;
          postString +="&invoice=" + this.invoice;

          //postString +="&id_rackstatus_current_lawas" + this.editData.
          let putEditData = {
            id_booking:this.id_booking,
            id_user:id_user,
            id_user_ubah:this.editData.id_user,
            id_rackstatus_current_lawas: this.editData.id_rackstatus_current_lawas,
            id_rackstatus_current:this.id_rackstatus_current,
            date_commit_lawas:this.editData.date_commit,
            id_rack : this.id_rack_edit,
            id_alacarte:this.id_alacarte_edit,
            validator:this.am,
            customer_name:this.company,
            customer_address:this.city,
            price_request:this.price,
            note_additional:this.note_additional,
            invoice:this.invoice
          }
          //console.log(this.id_alacarte_edit);
          //console.log(postString);
          //console.log(this.id_alacarte_edit);
          //this.global.loading.dismiss();
          //return false;

          this.booking.updateBooking(putEditData).then(data=>{
            this.global.loading.dismiss();
            this.navCtrl.push(SummaryPage,{id_booking:data['id_booking']});
            
          }).catch(err=>{
            this.global.loading.dismiss();
            this.global.alertOK("Error Sending Data",err);
          });
        })
      }) 
    }
    
    


  }
}
