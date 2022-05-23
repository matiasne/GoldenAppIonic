import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaConsultasPageRoutingModule } from './tabla-consultas-routing.module';

import { TablaConsultasPage } from './tabla-consultas.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    TablaConsultasPageRoutingModule
  ],
  declarations: [TablaConsultasPage]
})
export class TablaConsultasPageModule {}
