import { Component } from '@angular/core';
import { IonicPage,  NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
	loginData = { email:'', password:'' };
	data: any;
  constructor(private atrCtrl:AlertController, private authService:AuthServiceProvider,private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin()
  {
		this.showLoader();
		this.authService.login(this.loginData).then((result) => {
			this.loading.dismiss();
			this.data = result;
			if(this.data.code=='200')
			{
        console.log(this.data.data.email);
        localStorage.setItem('id_user_role', this.data.data.id_user_role);
        localStorage.setItem('id_user', this.data.data.id_user);
        localStorage.setItem('email', this.data.data.email);
        localStorage.setItem('password', this.data.data.password);
        localStorage.setItem('nik', this.data.data.nik);
        localStorage.setItem('emp_name', this.data.data.emp_name);
        localStorage.setItem('id_title', this.data.data.id_title);
        localStorage.setItem('is_active', this.data.data.is_active);
        localStorage.setItem('emp_title', this.data.data.emp_title);
        localStorage.setItem('id_role', this.data.data.id_role);
        localStorage.setItem('role', this.data.data.role);
        localStorage.setItem('id_whitelist', this.data.data.id_whitelist);
        localStorage.setItem('company_name', this.data.data.company_name);
        this.navCtrl.setRoot(HomePage);}
				else{
					let alert = this.atrCtrl.create({
						title: 'Please try again...',
						subTitle: this.data.Message,
						buttons: ['OK']
					});
					alert.present();
				}
			}, (err) => {
				this.loading.dismiss();
				this.presentToast(err);
			});
  }



  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
  
    this.loading.present();
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
