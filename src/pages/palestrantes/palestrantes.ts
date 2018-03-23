import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-palestrantes',
  templateUrl: 'palestrantes.html',
})
export class PalestrantesPage {

  data: any;
  public tabela:string = 'palestrante';
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service: ServiceProvider,public loadingCtrl: LoadingController) {

      this.getDados();
      this.getPalestrantes();

  }

  getDados(){

    let loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    loader.present();

    this.service.getData('palestrante').subscribe(
        data => {this.data = data,
          loader.dismiss();
        },
        //data => console.log(data),
        err => console.log(err)
    )
  }

  getPalestrantes(){
    this.service.getTabela('palestrante');
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // Reset items back to all of the items
   // if (val && val.trim() == ''){this.getDados()};

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return ((item.nome+item.origem).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.getDados()
    }
  }


}
