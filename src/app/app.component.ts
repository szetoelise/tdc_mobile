import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {GlobalProvider} from '../providers/global/global';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LogoutPage } from '../pages/logout/logout';
import {DatacenterdetailPage} from '../pages/datacenterdetail/datacenterdetail';
import {AddbookingPage} from '../pages/addbooking/addbooking';
import {HistoryPage} from '../pages/history/history';
import {CertificatePage} from '../pages/certificate/certificate';
import {PickfloorPage} from '../pages/pickfloor/pickfloor';
import {AlacartePage} from '../pages/alacarte/alacarte';
import {PickbuildingPage} from '../pages/pickbuilding/pickbuilding';
import {SummaryPage} from '../pages/summary/summary';
import {PickrackPage} from '../pages/pickrack/pickrack';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any =HomePage ;
  //rootPage:any = AlacartePage;
  public x:Date;
 
  constructor(
    private authService:AuthServiceProvider,
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private global: GlobalProvider) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //splashScreen.hide();
    });
  }

  logout() {
    this.global.storage.ready().then(()=>{
      this.global.storage.get("email").then(email=>{
        this.global.storage.get("password").then(pass=>{
            this.authService.logout({email:email,password:pass}).then(data=>{
              this.global.storage.clear();
              this.nav.setRoot(LoginPage);
            });
        })
      });
    });
    //this.storage.set("islogin","0");
    
  }
  

}

