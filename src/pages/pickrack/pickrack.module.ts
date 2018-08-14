import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickrackPage } from './pickrack';

@NgModule({
  declarations: [
    PickrackPage,
  ],
  imports: [
    IonicPageModule.forChild(PickrackPage),
  ],
})
export class PickrackPageModule {}
