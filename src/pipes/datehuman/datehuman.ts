import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatehumanPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'datehuman',
})
export class DatehumanPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
      
        let newValue =new Date(value);
        return newValue;
  }
}
