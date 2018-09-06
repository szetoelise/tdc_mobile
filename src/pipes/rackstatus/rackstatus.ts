import { Pipe, PipeTransform } from '@angular/core';
import {GlobalProvider} from '../../providers/global/global';
/**
 * Generated class for the RackstatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'rackstatus',
})
export class RackstatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(
  public global:GlobalProvider){

  }
  transform(value: string, ...args) {
        var id_role = args[0];
        let newValue ="<strong>" + this.global.rackStatus(value,id_role) + "</strong>"; 
        return newValue;
  }

}
