import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPagosPage } from './details-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPagosPage
  },
  {
    path: 'form-filtros',
    loadChildren: () => import('./form-filtros/form-filtros.module').then( m => m.FormFiltrosPageModule)
  },
  {
    path: 'tabla-detalle-pago',
    loadChildren: () => import('./tabla-detalle-pago/tabla-detalle-pago.module').then( m => m.TablaDetallePagoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPagosPageRoutingModule {}
