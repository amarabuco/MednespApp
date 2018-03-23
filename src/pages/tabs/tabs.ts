import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PalestrasPage } from '../palestras/palestras';
import { PalestrantesPage } from '../palestrantes/palestrantes';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = PalestrantesPage;
  tab5Root = PalestrasPage;

  constructor() {

  }
}
