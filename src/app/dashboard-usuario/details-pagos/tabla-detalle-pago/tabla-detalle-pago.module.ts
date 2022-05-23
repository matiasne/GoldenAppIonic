import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaDetallePagoPageRoutingModule } from './tabla-detalle-pago-routing.module';

import { TablaDetallePagoPage } from './tabla-detalle-pago.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    TablaDetallePagoPageRoutingModule
  ],
  declarations: [TablaDetallePagoPage]
})
export class TablaDetallePagoPageModule {}
