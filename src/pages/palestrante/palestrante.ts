import {  Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the PalestrantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-palestrante',
  templateUrl: 'palestrante.html',
})
export class PalestrantePage {
  
  data: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,public loadingCtrl: LoadingController) {
    this.selectedItem = navParams.get('item');

    this.getDados();
  }

  getDados(){

    let loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    loader.present();

    this.service.getData('palestra').subscribe(
        data => {
          this.data = data,
          loader.dismiss();
        },
        //data => console.log(data),
        err => console.log(err)
    )
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PalestrantePage');
  }

}
