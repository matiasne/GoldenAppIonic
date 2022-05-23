import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAdminPage } from './dashboard-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardAdminPage
  },
  {
    path: 'form-cambiar-contrasena',
    loadChildren: () => import('./form-cambiar-contrasena/form-cambiar-contrasena.module').then( m => m.FormCambiarContrasenaPageModule)
  },
  {
    path: 'form-asignar-cuit',
    loadChildren: () => import('./form-asignar-cuit/form-asignar-cuit.module').then( m => m.FormAsignarCuitPageModule)
  },
  {
    path: 'details-usuario',
    loadChildren: () => import('./details-usuario/details-usuario.module').then( m => m.DetailsUsuarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminPageRoutingModule {}
