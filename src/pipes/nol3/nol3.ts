import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Nol3Pipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'nol3',
})
export class Nol3Pipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  pad (str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

  transform(value: string, ...args) {
    var max = args[0];
    return this.pad(value,max);
  }
}
