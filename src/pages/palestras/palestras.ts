import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-palestras',
  templateUrl: 'palestras.html',
})
export class PalestrasPage {

  palestrantes: any;
  data: any;
  public tabela:string = 'palestra';
  items: string[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,public loadingCtrl: LoadingController) {

    this.getDados();
    this.getPalestrante();

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

    getPalestrante(){

      this.service.getData('palestrante').subscribe(
          palestrantes => {
            this.palestrantes = palestrantes
          },
          //data => console.log(data),
          err => console.log(err)
      )
    }

    setPalestrante(){
      console.log(this.getPalestrante());
    }

    getItems(ev: any) {
      // set val to the value of the searchbar
      let val = ev.target.value;

      // Reset items back to all of the items
     // if (val && val.trim() == ''){this.getDados()};

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.data = this.data.filter((item) => {
          return ((item.descricao+item.data+item.palestrante).toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        this.getDados()
      }
    }


  ionViewDidLoad() {
    this.setPalestrante();
    }

  visible=false;
  itemTapped(event, item) {
    //console.log(event);
    //console.log(item);
    this.visible = !this.visible;
    var icone = event.toElement;
    icone;
    console.log(icone);
    }
  

}
