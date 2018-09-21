import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams,ActionSheetController   } from 'ionic-angular';
import {AddbookingPage} from '../addbooking/addbooking';
import {DetailbookingPage} from '../detailbooking/detailbooking';
import {UpdatevalidatorPage} from '../updatevalidator/updatevalidator';
import {EditformassistPage} from '../editformassist/editformassist';
import {RequestvisitPage} from '../requestvisit/requestvisit';
import {EdittransactionPage} from '../edittransaction/edittransaction';
import {EditbookingstatusPage} from '../editbookingstatus/editbookingstatus';
import {PickrackPage} from '../pickrack/pickrack';


import {VisitProvider} from '../../providers/visit/visit';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';

import { interval } from 'rxjs/observable/interval';
//import { RequestvisitPage } from '../requestvisit/requestvisit';


/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  topTab: any;
  visitAll:any;
  bookingAll:any;
  id_role:string;
  id_user:string;
  public isrecommended;
  public showValidator;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public visit:VisitProvider,
    public global:GlobalProvider,
    public booking:BookingProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
    this.topTab = 'booking';
  }

  clickEditBookingStatus(id_booking,id_rackstatus,days_commit){
    this.navCtrl.push(EditbookingstatusPage,{id_booking:id_booking,id_rackstatus:id_rackstatus,days_commit:days_commit});
  }

  clickEditTrasaction(id_booking,id_statustransaksi){
    this.navCtrl.push(EdittransactionPage,{id_booking:id_booking,id_statustransaksi:id_statustransaksi});
  }

  clickRequestVisit(id_booking){
    this.navCtrl.push(RequestvisitPage,{id_booking:id_booking});
  }
  
  clickEditBooking(id_booking){
    this.navCtrl.push(EditformassistPage,{id_booking:id_booking});
  }

  clickEditBookingWithInvoice(id_booking,id_rackstatus,days_commit){
    //this.id_dacen = this.navParams.get("id_dacen");
    //this.id_sector = this.navParams.get("id_sector");
    //this.id_floor = this.navParams.get("id_floor");
    
    

    this.booking.editBooking(id_booking).then(data=>{
       let dataJson = data['data'].dacen[0]; 
        this.navCtrl.push(PickrackPage,{
          id_booking:id_booking,
          id_dacen:dataJson.id_dacen,
          id_sector:dataJson.id_sector,
          id_floor:dataJson.id_floor,
          id_rackstatus:id_rackstatus,
          days_commit:days_commit
         });
     }).catch(err=>{
       console.log(err);
     });
  }

  clickDetail(id_booking){
    this.navCtrl.push(DetailbookingPage,{id_booking:id_booking});
  }

  clickUpdateValidator(id_booking,id_invoice){
    this.navCtrl.push(UpdatevalidatorPage,{id_booking:id_booking,invoice:id_invoice,id_user:this.id_user});
  }


  clickCancel_assist(id_booking){
    let alert = this.alertCtrl.create({
      title: 'Cancel',
      message: 'Do yo want to cancel this transaction?',
      inputs: [
        {
          name: 'note'
        }
      ],
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            //this.global.alertOK("test",data.note);
            this.global.showLoader("Please Wait...");
            this.global.storage.get("id_user").then(id_user=>{
              this.booking.cancelAssists(id_booking,id_user,data.note).then(data=>{
                this.global.loading.dismiss();
                if(data['code']=='501'){
                  this.global.alertOK("Error","Update failed");
                }
                this.ionViewDidEnter();
                this.global.alertOK("Success","Transaction successfully Canceled");
              }).catch(err=>{

              });
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',

        }
      ]
    });
    alert.present();
  }

  clickCancel(id_booking){
    this.global.showLoader("Please wait...");
    this.global.storage.get("id_user").then(id_user=>{
      this.booking.cancelBooking(id_booking,id_user).then(data=>{
        
        this.global.loading.dismiss();
        if(data['code']=='501'){
          this.global.alertOK("Error","Update failed");
        }
        this.ionViewDidEnter();
      }).catch(err=>{
        this.global.alertOK("Error",err.message);
        this.global.loading.dismiss();
      })
    })
  }
  
  presentActionSheet(id_booking,id_invoice,id_role,statustransaksi,statusvisit,id_rackstatus,days_commit) {

   id_role = parseInt(id_role);
   if(statustransaksi==null){
    statustransaksi = '';
   }

   if(id_rackstatus==null){
    id_rackstatus= '';
   }
   // console.log(statustransaksi + " " + id_rackstatus);
   let finalval = [];
   if(id_role==1){
   // Role Dispatcher
   finalval = [{
    text: 'Detail',
    handler: () => {
      this.clickDetail(id_booking);
    }    
  }];
   if(
    statustransaksi == '' && id_rackstatus =='' || 
    statustransaksi == '' && id_rackstatus =='3' || 
    statustransaksi == '' && id_rackstatus =='4' || 
    statustransaksi == '1' && id_rackstatus =='3' || 
    statustransaksi == '1' && id_rackstatus =='4' || 
    statustransaksi == '1' && id_rackstatus ==''  || 
    statustransaksi == '2' && id_rackstatus =='3' || 
    statustransaksi == '2' && id_rackstatus =='4' || 
    statustransaksi == '2' && id_rackstatus ==''  || 
    statustransaksi == '3' && id_rackstatus =='3' || 
    statustransaksi == '3' && id_rackstatus =='4' ||
    statustransaksi == '3' && id_rackstatus ==''){
      finalval = [{
        text: 'Detail',
        handler: () => {
          this.clickDetail(id_booking);
        }    
      },{
        text: 'Update Validator',
        handler: () => {
          this.clickUpdateValidator(id_booking,id_invoice);
          
        }    
      }];
    }

   }else if(id_role==2){
   // Role Requester
   finalval.push({
    text: 'Detail',
    handler: () => {
      this.clickDetail(id_booking);
    }    
  });

  if(
    statustransaksi == ''  && id_rackstatus ==''  || 
    statustransaksi == ''  && id_rackstatus =='3' || 
    statustransaksi == ''  && id_rackstatus =='4' || 
    statustransaksi == '1' && id_rackstatus =='3' || 
    statustransaksi == '1' && id_rackstatus =='4' || 
    statustransaksi == '1' && id_rackstatus ==''  || 
    statustransaksi == '2' && id_rackstatus =='3' || 
    statustransaksi == '2' && id_rackstatus =='4' || 
    statustransaksi == '2' && id_rackstatus == '' || 
    statustransaksi == '3' && id_rackstatus =='3' || 
    statustransaksi == '3' && id_rackstatus =='4' ||
    statustransaksi == '3' && id_rackstatus == '' ){
      
      if(id_invoice=='' || id_invoice==null){
          finalval.push(        {
            text: 'Edit',
            handler: () => {
              this.clickEditBooking(id_booking);
            }    
          });
      }

      if(id_invoice=='' || id_invoice==null){
        finalval.push({
          text: 'Cancel',
          handler: () => {
            this.clickCancel_assist(id_booking);
          }    
        });
      }else{
        finalval.push({
          text: 'Cancel',
          handler: () => {
            this.clickCancel(id_booking);
          }    
        });
      }      


      if(statusvisit==0 || statusvisit=='0'){
        finalval.push({
          text: 'Request Visit',
          handler: () => {
            this.clickRequestVisit(id_booking);
          }    
        });
     
      }    

    }


   }else if(id_role==3){
   // Role Validator
   finalval.push({
    text: 'Detail',
    handler: () => {
      this.clickDetail(id_booking);
    }    
  });

   if(
    statustransaksi == ''  && id_rackstatus ==''  || 
    statustransaksi == ''  && id_rackstatus =='3' || 
    statustransaksi == ''  && id_rackstatus =='4' || 
    statustransaksi == '1' && id_rackstatus =='3' || 
    statustransaksi == '1' && id_rackstatus =='4' || 
    statustransaksi == '1' && id_rackstatus ==''  || 
    statustransaksi == '2' && id_rackstatus =='3' || 
    statustransaksi == '2' && id_rackstatus =='4' || 
    statustransaksi == '2' && id_rackstatus == '' || 
    statustransaksi == '3' && id_rackstatus =='3' || 
    statustransaksi == '3' && id_rackstatus =='4' ||
    statustransaksi == '3' && id_rackstatus == '' ){

      if(id_invoice=='' || id_invoice==null){
        finalval.push({
          text: 'Edit Booking',
          handler: () => {
            this.clickEditBooking(id_booking);
          }    
        });
    }else{
      finalval.push({
        text: 'Edit Booking',
        handler: () => {
          this.clickEditBookingWithInvoice(id_booking,id_rackstatus,days_commit);
        }    
      });
    }
    finalval.push({
      text: 'Update Transaction Status',
      handler: () => {
        this.clickEditTrasaction(id_booking,statustransaksi);
      }    
    });

    finalval.push({
      text: 'Update Booking Status',
      handler: () => {
        this.clickEditBookingStatus(id_booking,id_rackstatus,days_commit);
      }    
    });
    finalval.push({
      text: 'Cancel',
      handler: () => {
        this.clickCancel(id_booking);
      }    
    });

  }
   }else if(id_role==4){
   // Role Admin
    finalval.push({
      text: 'Detail',
      handler: () => {
        this.clickDetail(id_booking);
      }    
    });

    if(
      statustransaksi == '' && id_rackstatus =='' || 
      statustransaksi == '' && id_rackstatus =='3' || 
      statustransaksi == '' && id_rackstatus =='4' || 
      statustransaksi == '1' && id_rackstatus =='3' || 
      statustransaksi == '1' && id_rackstatus =='4' || 
      statustransaksi == '1' && id_rackstatus ==''  || 
      statustransaksi == '2' && id_rackstatus =='3' || 
      statustransaksi == '2' && id_rackstatus =='4' ||
      statustransaksi == '2' && id_rackstatus ==''  ||  
      statustransaksi == '3' && id_rackstatus =='3' || 
      statustransaksi == '3' && id_rackstatus =='4' ||
      statustransaksi == '3' && id_rackstatus ==''){

      }

   }

 
   

    let actionSheet = this.actionSheetCtrl.create({
      title: "ID Invoice : " + id_invoice,
      buttons: finalval
    });
 
    actionSheet.present();
  }


  //ionViewDidEnter(){
    //alert("test");
  //}

  ionViewDidEnter() {
    console.log('ionViewDidLoad HistoryPage');



    this.global.showLoader("Please Wait...");
    this.global.storage.get("id_user").then(id_user=>{
      this.global.storage.get("id_role").then(id_role=>{
        
        //id_role = 3;
        this.id_role = id_role;
        this.id_user = id_user;

        this.visit.visitList(id_user,id_role).then(data=>{
          if( data['data']=='kosong'){
            this.visitAll = null;
          }else{
          this.visitAll = data['data'];
          }
          //console.log(data);
        }).catch(err=>{
          console.log(err);
        });


        //if ($this->session->userdata('id_role')=='1' || $this->session->userdata('id_role')=='4')
        if(parseInt(id_role)==1 || parseInt(id_role)==4 ){
          this.isrecommended = true;
        }else{
          this.isrecommended = false;
        }

        //if ($this->session->userdata('id_role')!='3' )
        if(parseInt(id_role)!=3){
          this.showValidator = true;
        }else{
          this.showValidator = false;
        }

        this.visit.listBookingRack(id_user,id_role).then(data=>{
          if(parseInt(data['total'])==0){
            this.bookingAll = null;
          }else{
            this.bookingAll = data['data'];
          }
          this.global.loading.dismiss();
        }).catch(err=>{
          this.global.alertOK("Error",err);
          this.global.loading.dismiss();
        });
      });
    });

  
  }

  selectedTabChanged(evt)
  {
    
  }

  showAdd(){
    this.navCtrl.push(AddbookingPage);
  }
}
