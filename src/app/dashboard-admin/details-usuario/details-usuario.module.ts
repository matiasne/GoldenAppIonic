import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsUsuarioPageRoutingModule } from './details-usuario-routing.module';

import { DetailsUsuarioPage } from './details-usuario.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule,
    DetailsUsuarioPageRoutingModule
  ],
  declarations: [DetailsUsuarioPage]
})
export class DetailsUsuarioPageModule {}
