import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectivityPage } from './connectivity';

@NgModule({
  declarations: [
    ConnectivityPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectivityPage),
  ],
})
export class ConnectivityPageModule {}
