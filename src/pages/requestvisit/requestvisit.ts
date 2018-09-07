import { Component,Directive, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GlobalProvider} from '../../providers/global/global';
import { BookingProvider} from '../../providers/booking/booking';
import { VisitProvider} from '../../providers/visit/visit';
import { AlertController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
import {RestDacenProvider} from '../../providers/rest-dacen/rest-dacen';
/**
 * Generated class for the RequestvisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestvisit',
  templateUrl: 'requestvisit.html',
})

export class RequestvisitPage {
  public Visit= {id_booking:'',id_dacen:'',client_name:'',time_visit:'',dacen:'',visitor_list:'',customer_name:'',myDate:'',myTime:''};
  public myDate:any;
  public myTime:any;
  public dacen:any;
  public openMe:boolean=false;
  public id_booking;
  public isnodacen:boolean=false;
  private cboDatcenCat:any;
  private cboDacen:any
  private dacenCat:any;
  private Dacen:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global:GlobalProvider,
    public booking:BookingProvider,
    public visit:VisitProvider,
    public alt:AlertController,
    private restDacenCat:RestDacenCategoryProvider,
    private restDacen:RestDacenProvider) {

    //this.Visit.dacen = this.navParams.get('dacen');
    //this.Visit.customer_name = this.navParams.get('customer_name');
    this.id_booking = this.navParams.get("id_booking");  
    setInterval(() => { 
      this.openDatepicker(); 
   }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestvisitPage');
    this.global.showLoader("Please wait..");
    this.global.storage.get("id_user").then(id_user=>{
      this.global.storage.get("id_role").then(id_role=>{
        this.booking.historyRack(this.id_booking,id_user,id_role).then(data=>{
          let dacen = data['data'].dacen;
          let users = data['data'].users;
          this.Visit.id_dacen = dacen[0].id_dacen;
          if(this.Visit.id_dacen=='' || this.Visit.id_dacen==null){
            this.isnodacen = true;
            this.restDacenCat.listCategory().then(data1=>{
              this.global.loading.dismiss();
              this.dacenCat = data1['data']
            }).catch(err=>{
              this.global.loading.dismiss();

            })
          }else{
            this.isnodacen = false;
            this.global.loading.dismiss();
          }
          this.Visit.id_booking = this.id_booking;
          this.Visit.client_name = users[0].customer_name;
          this.Visit.dacen = dacen[0].dacen_name;
          this.Visit.customer_name = users[0].customer_name;
          
        }).catch(err=>{
          this.global.loading.dismiss();
          this.global.alertOK("Upps",err);
        })
      })
    })
  }

  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('picker') picker:any;
  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }


  datcenCatChange(){
    this.global.showLoader("Please wait..");
    this.restDacen.listDacenByCategory(this.cboDatcenCat).then(data=>{
      this.Dacen = data['data'];
      this.global.loading.dismiss();
    }).catch(err=>{
      this.global.loading.dismiss();
      this.global.alertOK("Uppss..","There is internet connection problem on your side.")
    });
    //console.log(this.cboDatcenCat);
  }  
  
  toBack(){
    //this.picker.open();
    this.navCtrl.pop();
  }

  openDatepicker(){
    if(this.openMe){
      this.picker.open();
      this.openMe=false;
    }
  }

  change_dateValue(){
    var myDate1 = new Date();
    myDate1.setFullYear(this.myDate.substr(0,4));
    myDate1.setMonth(this.myDate.substr(6,1));
    myDate1.setDate(this.myDate.substr(8,3));
    //alert(this.myDate.substr(8,3));
    //console.log(myDate1.getDay());
    if(myDate1.getDay() == 1 || myDate1.getDay() == 2){
     
      let alert = this.alt.create({
        title: 'Invalid Date',
        message: 'Visit request only available at office hours',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.myDate = '';
              this.openMe=true;
            }
          }
        ]
      });
      alert.present();      
      //this.global.alertOK("Invalid Date","Only can do visit at office days");
      //console.log("ini weekend");
      //return false;
    } 
  }

  submitVisit(){
    // 'id_booking' 	=> $this->input->post('id_booking'),
		// 	'id_dacen' 		=> $this->input->post('id_dacen'),
		// 	'client_name' 	=> $this->input->post('client_name'),
		// 	'time_visit' 	=> $this->input->post('time_visit'),
    // 	'visitor_list' 	=> $this->input->post('visitor_list')
    if(this.isnodacen) {
      if(this.cboDatcenCat=='' || this.cboDatcenCat==null || this.cboDatcenCat.trim()=='')
      {
        this.global.alertOK("Error Input","Select category first.");
        return false;
      }

      if(this.cboDacen=='' || this.cboDacen==null || this.cboDacen.trim()=='')
      {
        this.global.alertOK("Error Input","Select data center first.");
        return false;
      }
    }

    if(this.Visit.visitor_list=='' || this.Visit.visitor_list==null || this.Visit.visitor_list.trim()=='')
    {
      this.global.alertOK("Error Input","Visitor list cannot be empty.");
      return false;
    }

    if(this.myDate=='' || this.myDate==null || this.myDate.trim()=='')
    {
      this.global.alertOK("Error Input","Date of visit cannot be empty.");
      return false;
    } 

    if(this.myTime=='' || this.myTime==null || this.myTime.trim()=='')
    {
      this.global.alertOK("Error Input","Time of visit cannot be empty.");
      return false;
    }     

    if(this.isnodacen){
      this.Visit.id_dacen = this.cboDacen;
    }
    
    this.Visit.time_visit = this.myDate + " " + this.myTime;
    this.global.showLoader("Please wait...");
    this.visit.saveVisit(this.Visit).then(data=>{
      if(data['code']=='200'){
        this.global.loading.dismiss();
        this.global.alertOK("Success","Successfully request visit");
        this.navCtrl.pop();
      }else
      {
        this.global.loading.dismiss();
        this.global.alertOK("Error " + data['code'],data['message']);
      }
    }).catch(err=>{
      this.global.loading.dismiss();
      this.global.alertOK("Error" ,"You have to pick data center to request visit.");
    });

  }
}
