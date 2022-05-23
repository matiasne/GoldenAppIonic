import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormFiltrosPage } from './form-filtros.page';

const routes: Routes = [
  {
    path: '',
    component: FormFiltrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormFiltrosPageRoutingModule {}
