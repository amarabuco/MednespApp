import { PalestranteService } from './../../providers/palestrante/palestrante.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { SqliteHelperService } from './../../providers/sqlite-helper/sqlite-helper.service';

import { ServiceProvider } from '../../providers/service/service';
import { PalestrantePage } from '../palestrante/palestrante';
import { Palestrante } from './../../models/palestrante.model';


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
  palestrantes: Palestrante [] = [
    new Palestrante ('!','!','!','!','!','!','!','!','!','!'),
    new Palestrante ('?','?','?','?','?','?','?','?','?','?')  

  ];


    constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: ServiceProvider,
    public loadingCtrl: LoadingController,
    public sqliteHelperService: SqliteHelperService,
    public palestranteService: PalestranteService,
    public palestrante: Palestrante
    ) 
    {
      this.getDados();
      this.getPalestrantes(); 

    }

    ionViewDidLoad(){
      this.palestranteService.getAll()
      .then((palestrantes: Palestrante[]) => {
        this.palestrantes = palestrantes;
      });
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
    
    this.service.getTabela('palestrante')
  
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

      itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PalestrantePage, {
      item: item
    });
  }

  onSave(){
  

  }
  

}
