import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the InvoicePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'invoice',
})
export class InvoicePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value==null){
      return "-";
    }else{

      let value1 = value.substr(0,8);
      let value2 = value.substr(8,5);
      let value3 = value.substr(13,3);
      return value1 + "<font class='font_red'><strong>" + value2 + "</strong></font>" + value3 ;
      
    }
  }
}
