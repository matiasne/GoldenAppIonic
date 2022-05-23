import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAsignarCuitPage } from './form-asignar-cuit.page';

const routes: Routes = [
  {
    path: '',
    component: FormAsignarCuitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAsignarCuitPageRoutingModule {}
