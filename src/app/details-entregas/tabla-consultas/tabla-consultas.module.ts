import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaConsultasPageRoutingModule } from './tabla-consultas-routing.module';

import { TablaConsultasPage } from './tabla-consultas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaConsultasPageRoutingModule
  ],
  declarations: [TablaConsultasPage]
})
export class TablaConsultasPageModule {}
