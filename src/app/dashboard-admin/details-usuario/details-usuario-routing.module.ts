import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsUsuarioPage } from './details-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsUsuarioPageRoutingModule {}
