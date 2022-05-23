import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaConsultasPage } from './tabla-consultas.page';

const routes: Routes = [
  {
    path: '',
    component: TablaConsultasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaConsultasPageRoutingModule {}
