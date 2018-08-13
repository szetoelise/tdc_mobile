import { NgModule } from '@angular/core';
import { StringmanPipe } from './stringman/stringman';
import { DatehumanPipe } from './datehuman/datehuman';
@NgModule({
	declarations: [StringmanPipe,
    DatehumanPipe],
	imports: [],
	exports: [StringmanPipe,
    DatehumanPipe]
})
export class PipesModule {}
