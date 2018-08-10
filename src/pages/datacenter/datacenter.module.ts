import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatacenterPage } from './datacenter';

@NgModule({
  declarations: [
    DatacenterPage,
  ],
  imports: [
    IonicPageModule.forChild(DatacenterPage),
  ],
})
export class DatacenterPageModule {}
