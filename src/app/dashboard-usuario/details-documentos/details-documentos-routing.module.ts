import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsDocumentosPage } from './details-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsDocumentosPageRoutingModule {}
