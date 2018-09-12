import { NgModule } from '@angular/core';
import { StringmanPipe } from './stringman/stringman';
import { DatehumanPipe } from './datehuman/datehuman';
import { RackstatusPipe } from './rackstatus/rackstatus';
import { InvoicePipe } from './invoice/invoice';
import { StatustransaksiPipe } from './statustransaksi/statustransaksi';
import { Nol3Pipe } from './nol3/nol3';
@NgModule({
	declarations: [StringmanPipe,
    DatehumanPipe,
    RackstatusPipe,
    InvoicePipe,
    StatustransaksiPipe,
    Nol3Pipe],
	imports: [],
	exports: [StringmanPipe,
    DatehumanPipe,
    RackstatusPipe,
    InvoicePipe,
    StatustransaksiPipe,
    Nol3Pipe]
})
export class PipesModule {}
