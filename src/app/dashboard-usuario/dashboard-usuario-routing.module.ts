import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardUsuarioPage } from './dashboard-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardUsuarioPage
  },
  {
    path: 'details-entregas',
    loadChildren: () => import('./details-entregas/details-entregas.module').then( m => m.DetailsEntregasPageModule)
  },
  {
    path: 'details-pagos',
    loadChildren: () => import('./details-pagos/details-pagos.module').then( m => m.DetailsPagosPageModule)
  },
  {
    path: 'details-documentos',
    loadChildren: () => import('./details-documentos/details-documentos.module').then( m => m.DetailsDocumentosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardUsuarioPageRoutingModule {}
