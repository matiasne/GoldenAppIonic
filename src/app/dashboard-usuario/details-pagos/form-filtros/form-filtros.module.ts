import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormFiltrosPageRoutingModule } from './form-filtros-routing.module';

import { FormFiltrosPage } from './form-filtros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormFiltrosPageRoutingModule
  ],
  declarations: [FormFiltrosPage]
})
export class FormFiltrosPageModule {}
