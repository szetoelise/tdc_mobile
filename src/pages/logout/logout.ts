import { Component } from '@angular/core';
import { IonicPage,  NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  loading:any;
	loginData = { email:'mobile@sigma.co.id', password:'mobile123' };
	data: any;
  constructor(private atrCtrl:AlertController, private authService:AuthServiceProvider,private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private loadingCtrl:LoadingController) {
  
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LogoutPage');
    //this.loginData.email = "mobile@sigma.co.id";
    //this.loginData.password = "mobile123";
    this.doLogout();
  }
  doLogout()
  {
		this.showLoader();
		this.authService.logout(this.loginData).then((result) => {
			this.loading.dismiss();
      this.data = result;
      console.log(result);
      
			if(this.data.code=='200')
			{
        //console.log(this.data.code.email);

        this.navCtrl.setRoot(HomePage);}
				else{
					let alert = this.atrCtrl.create({
						title: 'Please try again...',
						subTitle: this.data.message,
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
