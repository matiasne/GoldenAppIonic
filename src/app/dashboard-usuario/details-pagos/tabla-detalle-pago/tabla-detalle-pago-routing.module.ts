import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaDetallePagoPage } from './tabla-detalle-pago.page';

const routes: Routes = [
  {
    path: '',
    component: TablaDetallePagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaDetallePagoPageRoutingModule {}
