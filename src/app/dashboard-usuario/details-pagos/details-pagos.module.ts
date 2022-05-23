import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPagosPageRoutingModule } from './details-pagos-routing.module';

import { DetailsPagosPage } from './details-pagos.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    DetailsPagosPageRoutingModule
  ],
  declarations: [DetailsPagosPage]
})
export class DetailsPagosPageModule {}
