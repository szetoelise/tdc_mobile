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
  //loginData = { email:'', password:'',id_requester_type:'' };
  Register = {email:'',nik:'',emp_name:'',id_requester_type:'',id_whitelist:'',no_tlpn:''}
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

  register(){
    if(this.Register.email=="" || this.Register.email==null){
      this.global.alertOK("Input Error","Input email cannot be empty.");
      return false;
    }else{
      if(!this.global.checkEmail(this.Register.email)){
        this.global.alertOK("Input Error","Not a valid email address");
        return false;
      }else{

      }
    }
    if(this.Register.emp_name=="" || this.Register.emp_name==null){
      this.global.alertOK("Input Error","Input Name cannot be empty.");
      return false;
    }

    if(this.Register.no_tlpn=="" || this.Register.no_tlpn==null){
      this.global.alertOK("Input Error","Input No. Telp cannot be empty.");
      return false;
    }

    if(this.Register.nik=="" || this.Register.nik==null){
      this.global.alertOK("Input Error","Input NIK cannot be empty.");
      return false;
    }

    if(this.Register.id_requester_type=="" || this.Register.id_requester_type==null){
      this.global.alertOK("Input Error","Input Requester Type cannot be empty.");
      return false;
    }

    if(this.Register.id_whitelist=="" || this.Register.id_whitelist==null){
      this.global.alertOK("Input Error","Input Company Type cannot be empty.");
      return false;
    }

    //oke
    this.global.showLoader("Please wait..");
    this.authService.register(this.Register).then(data=>{
        console.log(data);
        this.global.loading.dismiss();
        this.global.alertOK("Success","Congratulation , Your registration has been Successful. Please check your email at " + this.Register.email + " for password information");
        this.navCtrl.pop();
    }).catch(err=>{
      this.global.loading.dismiss();
      this.global.alertOK("Error",err);
    })

  }

}
