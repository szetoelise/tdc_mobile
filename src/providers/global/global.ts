import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public endpoint = "http://43.229.207.253/TelkomDC/";
  constructor() {
    console.log('Hello GlobalProvider Provider');
  }

}
