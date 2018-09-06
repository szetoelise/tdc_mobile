import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import {RackstatusPipe} from '../../pipes/rackstatus/rackstatus';
@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    RackstatusPipe
  ],
})
export class HistoryPageModule {}
