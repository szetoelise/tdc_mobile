import { Component,Directive, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public Visit= {dacen:'',visitor_list:'',customer_name:''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestvisitPage');
  }

  @ViewChild('myInput') myInput: ElementRef;
  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }


  toBack(){
    this.navCtrl.pop();
  }

  change_dateValue(){
    console.log("hey Man upon the top up hilll");
  }
}
