import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import {DatacenterPage} from '../pages/datacenter/datacenter';
import {DatacenterdetailPage} from '../pages/datacenterdetail/datacenterdetail';
import {DiagrampowerPage} from '../pages/diagrampower/diagrampower';
import {ConnectivityPage} from '../pages/connectivity/connectivity';
import {BuildingPage} from '../pages/building/building';
import {AvailabilityPage} from '../pages/availability/availability';
import {HistoryPage} from '../pages/history/history';
import {AddbookingPage} from '../pages/addbooking/addbooking';
import {CertificatePage} from '../pages/certificate/certificate';
import {PickfloorPage} from '../pages/pickfloor/pickfloor';
import {PickrackPage} from '../pages/pickrack/pickrack';
import {AlacartePage} from '../pages/alacarte/alacarte';
import {PickbuildingPage} from '../pages/pickbuilding/pickbuilding';
import {FormcustomerPage} from '../pages/formcustomer/formcustomer';
import {SummaryPage} from '../pages/summary/summary';


import { GlobalProvider } from '../providers/global/global';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestDacenCategoryProvider } from '../providers/rest-dacen-category/rest-dacen-category';
import { RestDacenProvider } from '../providers/rest-dacen/rest-dacen';

import { IonicStorageModule } from '@ionic/storage';

import {DatehumanPipe} from '../pipes/datehuman/datehuman';
import {StringmanPipe} from '../pipes/stringman/stringman'; 
//component
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VisitProvider } from '../providers/visit/visit';
import { AlacarteProvider } from '../providers/alacarte/alacarte';
import { BookingProvider } from '../providers/booking/booking';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LogoutPage,
    DatacenterPage,
    DatacenterdetailPage,
    DiagrampowerPage,
    ConnectivityPage,
    BuildingPage,
    AvailabilityPage,
    HistoryPage,
    AddbookingPage,
    CertificatePage,
    PickfloorPage,
    PickrackPage,
    AlacartePage,
    PickbuildingPage,
    FormcustomerPage,
    SummaryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    LazyLoadImageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
        name: 'tdc',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LogoutPage,
    DatacenterPage,
    DatacenterdetailPage,
    DiagrampowerPage,
    ConnectivityPage,
    BuildingPage,
    AvailabilityPage,
    HistoryPage,
    AddbookingPage,
    CertificatePage,
    PickfloorPage,
    PickrackPage,
    AlacartePage,
    PickbuildingPage,
    FormcustomerPage,
    SummaryPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    AuthServiceProvider,
    RestDacenCategoryProvider,
    RestDacenProvider,
    PhotoViewer,
    VisitProvider,
    AlacarteProvider,
    DatehumanPipe,
    StringmanPipe,
    BookingProvider
  ]
})
export class AppModule {}
