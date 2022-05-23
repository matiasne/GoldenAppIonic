import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaTotalesPage } from './tabla-totales.page';

const routes: Routes = [
  {
    path: '',
    component: TablaTotalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaTotalesPageRoutingModule {}
