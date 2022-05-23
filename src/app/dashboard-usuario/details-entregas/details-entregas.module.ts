import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsEntregasPageRoutingModule } from './details-entregas-routing.module';

import { DetailsEntregasPage } from './details-entregas.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    IonicModule,
    DetailsEntregasPageRoutingModule
  ],
  declarations: [DetailsEntregasPage]
})
export class DetailsEntregasPageModule {}
