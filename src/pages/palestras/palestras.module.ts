import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalestrasPage } from './palestras';

@NgModule({
  declarations: [
    PalestrasPage,
  ],
  imports: [
    IonicPageModule.forChild(PalestrasPage),
  ],
})
export class PalestrasPageModule {}
