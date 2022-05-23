import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCambiarContrasenaPage } from './form-cambiar-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: FormCambiarContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCambiarContrasenaPageRoutingModule {}
