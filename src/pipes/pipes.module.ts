import { NgModule } from '@angular/core';
import { StringmanPipe } from './stringman/stringman';
import { DatehumanPipe } from './datehuman/datehuman';
import { RackstatusPipe } from './rackstatus/rackstatus';
import { InvoicePipe } from './invoice/invoice';
import { StatustransaksiPipe } from './statustransaksi/statustransaksi';
@NgModule({
	declarations: [StringmanPipe,
    DatehumanPipe,
    RackstatusPipe,
    InvoicePipe,
    StatustransaksiPipe],
	imports: [],
	exports: [StringmanPipe,
    DatehumanPipe,
    RackstatusPipe,
    InvoicePipe,
    StatustransaksiPipe]
})
export class PipesModule {}
