import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {LoginPage} from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  public email;
  constructor(
    
    private authService:AuthServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private global:GlobalProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  login(){
    this.navCtrl.pop();
  }

  forgot(){
    if(!this.global.checkEmail(this.email)){
      this.global.alertOK("Input Error","Not a valid email address");
      return false;
    }
    this.global.showLoader("Please Wait..");
      this.authService.forgotPassword(this.email).then(data=>{
        this.global.loading.dismiss();
        if(data['code']=='404'){
          this.global.alertOK("Error",data['message']);
          return false;
        }else{
          this.global.alertOK("Please check your email","We sent you email with instruction about how to reset your password.");
        }

      }).catch(err=>{
        this.global.loading.dismiss();
        console.log(err);
      });
  }

}
