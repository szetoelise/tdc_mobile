import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloormapPage } from './floormap';

@NgModule({
  declarations: [
    FloormapPage,
  ],
  imports: [
    IonicPageModule.forChild(FloormapPage),
  ],
})
export class FloormapPageModule {}
