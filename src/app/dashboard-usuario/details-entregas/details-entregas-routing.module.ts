import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsEntregasPage } from './details-entregas.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsEntregasPage
  },
  {
    path: 'form-filtros',
    loadChildren: () => import('./form-filtros/form-filtros.module').then( m => m.FormFiltrosPageModule)
  },
  {
    path: 'tabla-consultas',
    loadChildren: () => import('./tabla-consultas/tabla-consultas.module').then( m => m.TablaConsultasPageModule)
  },
  {
    path: 'tabla-totales',
    loadChildren: () => import('./tabla-totales/tabla-totales.module').then( m => m.TablaTotalesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsEntregasPageRoutingModule {}
