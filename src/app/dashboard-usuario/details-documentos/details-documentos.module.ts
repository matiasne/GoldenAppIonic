import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsDocumentosPageRoutingModule } from './details-documentos-routing.module';

import { DetailsDocumentosPage } from './details-documentos.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    DetailsDocumentosPageRoutingModule
  ],
  declarations: [DetailsDocumentosPage]
})
export class DetailsDocumentosPageModule {}
