import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbookingPage } from './addbooking';

@NgModule({
  declarations: [
    AddbookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddbookingPage),
  ],
})
export class AddbookingPageModule {}
