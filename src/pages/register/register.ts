import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loginData = { email:'', password:'',id_requester_type:'' };
  public wL;
  public rT;

  constructor(
    private authService:AuthServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private global:GlobalProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.global.showLoader("Please Wait...");
    this.authService.requester_type().then(data=>{
        this.rT = data['data'];
        this.authService.list_whitelist().then(data1=>{
          this.wL = data1['data'];
          this.global.loading.dismiss();
        }).catch(err1=>{
          this.global.loading.dismiss();
        });
    }).catch(err=>{
      this.global.loading.dismiss();
    });
  }

  login(){
    this.navCtrl.pop();
  }

  rolesChange(){
    
  }
}
