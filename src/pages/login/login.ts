import { Component } from '@angular/core';
import { IonicPage,  NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NavController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalProvider } from '../../providers/global/global';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading:any;
	loginData = { email:'', password:'',id_role:'' };
  data: any;
  dataRoles: any;
  public userexist:boolean=false;
  constructor(
    private authService:AuthServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private global:GlobalProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogout(a,b){
    this.loginData.email = a;
    this.loginData.password = b;
    this.authService.logout(this.loginData).then(data=>{

    });
  }

  rolesChange(){

  }

  back(){
    this.userexist = false;
    this.loginData.email = "";
    this.loginData.password = "";
  }

  checkuser(){


    if(!this.global.checkEmail(this.loginData.email)){
      this.global.alertOK("Error Input","Not a valid email address");
      return false;
    }

		this.global.showLoader("Authenticating....");
		this.authService.getRoles(this.loginData.email).then((result) => {
 			this.global.loading.dismiss();
      this.dataRoles = result['data'];

      console.log(this.dataRoles);
			if(parseInt(result['total'])>0)
      {
        this.userexist = true;
      }else{
        this.userexist = false;
        this.global.alertOK("Error","Email address not registered");
        
      }
    }).catch(err=>{
      this.userexist = false;
      this.global.loading.dismiss();
    });
  }

  doLogin()
  {
		this.global.showLoader("Authenticating....");
		this.authService.login(this.loginData).then((result) => {
 			this.global.loading.dismiss();
			this.data = result;
			if(this.data.code=='200')
			{
        console.log(this.data.data[0]['id_user_role']);
        this.global.saveStorage('id_user_role', this.data.data[0]['id_user_role']);
        this.global.saveStorage('id_user', this.data.data[0]['id_user']);
        this.global.saveStorage('email', this.data.data[0]['email']);
        this.global.saveStorage('password', this.data.data[0]['password']);
        this.global.saveStorage('nik', this.data.data[0]['nik']);
        this.global.saveStorage('emp_name', this.data.data[0]['emp_name']);
        this.global.saveStorage('id_title', this.data.data[0]['id_title']);
        this.global.saveStorage('is_active', this.data.data[0]['is_active']);
        this.global.saveStorage('emp_title', this.data.data[0]['emp_title']);
        this.global.saveStorage('id_role', this.data.data[0]['id_role']);
        this.global.saveStorage('role', this.data.data[0]['role']);
        this.global.saveStorage('id_whitelist', this.data.data[0]['id_whitelist']);
        this.global.saveStorage('company_name', this.data.data[0]['company_name']);
        this.global.saveStorage('islogin', true);
        
        this.navCtrl.setRoot(HomePage);}
				else{
          this.global.alertOK("Login failed",this.data.message);         
				}
			}, (err) => {
        this.global.loading.dismiss();
        this.global.showToast(err);
			});
  }


  forgotPassword()
  {
    this.navCtrl.push(ForgotpasswordPage);
  }
 
  register()
  {
    this.navCtrl.push(RegisterPage);
  }
 

}
