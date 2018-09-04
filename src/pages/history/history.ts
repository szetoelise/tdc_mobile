import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController   } from 'ionic-angular';
import {AddbookingPage} from '../addbooking/addbooking';
import {VisitProvider} from '../../providers/visit/visit';
import {GlobalProvider} from '../../providers/global/global';
import {BookingProvider} from '../../providers/booking/booking';


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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public visit:VisitProvider,
    public global:GlobalProvider,
    public booking:BookingProvider,
    public actionSheetCtrl: ActionSheetController) {
    this.topTab = 'booking';
  }

  clickCancel(id_booking){
    this.booking.cancelBooking(id_booking).then(data=>{
      console.log(data);
    }).catch(err=>{
      this.global.alertOK("Error",err);
    })
  }
  
  presentActionSheet(id_booking,id_invoice,statustransaksi,statusvisit) {

    let finalval;

   

    let detailonly = [{
      text: 'Detail',
      handler: () => {
        console.log('Destructive clicked');
      }    
    }];

    let requester_detail_only = [
      {
        text: 'Detail',
        handler: () => {
          console.log('Destructive clicked');
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          this.clickCancel(id_booking);
        }
      },
      {
        text: 'Request Visit',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];


    let request_from_assist = [
      {
        text: 'Detail',
        handler: () => {
          console.log('Destructive clicked');
        }
      },
      {
        text: 'Edit',
        handler: () => {
          console.log('Destructive clicked');
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          this.clickCancel(id_booking);
        }
      },
      {
        text: 'Request Visit',
        handler: () => {
          console.log('Cancel clicked');
        }
      }     
    ];


    if(id_invoice==null || id_invoice==''){
      finalval = request_from_assist;
    }

    if(parseInt(statustransaksi)==4 || parseInt(statustransaksi)==5){
      finalval = detailonly;
    }

    

    let actionSheet = this.actionSheetCtrl.create({
      title: "ID Invoice : " + id_invoice,
      buttons: finalval
    });
 
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.visit.listAll().then(data=>{
      this.visitAll = data['data'];
      //console.log(data);
    }).catch(err=>{
      console.log(err);
    });

    this.global.showLoader("Please Wait...");
    this.global.storage.get("id_user").then(id_user=>{
      this.global.storage.get("id_role").then(id_role=>{
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
