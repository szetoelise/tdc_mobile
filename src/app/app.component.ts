import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import {DatacenterdetailPage} from '../pages/datacenterdetail/datacenterdetail';
import {AddbookingPage} from '../pages/addbooking/addbooking';
import {HistoryPage} from '../pages/history/history';
import {CertificatePage} from '../pages/certificate/certificate';
import {PickfloorPage} from '../pages/pickfloor/pickfloor';
import {AlacartePage} from '../pages/alacarte/alacarte';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =HomePage ;
  //rootPage:any = PickfloorPage;
  public x:Date;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

