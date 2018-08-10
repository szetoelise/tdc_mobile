import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestDacenCategoryProvider} from '../../providers/rest-dacen-category/rest-dacen-category';
//page
import {DatacenterPage} from '../datacenter/datacenter';
import {AvailabilityPage} from '../availability/availability';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  private dacenCat:any= {};
  private tempDacenCat:any={};
  private isLoading:boolean=false;

  constructor(public navCtrl: NavController,private restDacenCat:RestDacenCategoryProvider) {
    this.getDacenCat();
  }

  getDacenCat(){
    this.isLoading=true;
    this.restDacenCat.listCategory()
    .then(data => {
      this.isLoading=false;
      for (let val of data['data']){
        //val.child = 1;
        //this.tempDacenCat.data.options.push({data:val});
        //this.tempDacenCat.child =1;
        //console.log(val);
      }
      //console.log(this.tempDacenCat);
      this.dacenCat = data['data'];

    }).catch(err=>{
      console.log(err);
    });
  }

  generateTree(item){
    console.log(item.id_dacencategory);
    //this.dacenCat.id= item.id_dacencategory;
    console.log(this.dacenCat);
  }

  viewDataCenter(){
    this.navCtrl.push(DatacenterPage);
  }

  viewAvailability(){
    this.navCtrl.push(AvailabilityPage);
  }

  viewHistory(){

  }

}
