import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaTotalesPageRoutingModule } from './tabla-totales-routing.module';

import { TablaTotalesPage } from './tabla-totales.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    TablaTotalesPageRoutingModule
  ],
  declarations: [TablaTotalesPage]
})
export class TablaTotalesPageModule {}
