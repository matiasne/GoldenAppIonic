import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAsignarCuitPageRoutingModule } from './form-asignar-cuit-routing.module';

import { FormAsignarCuitPage } from './form-asignar-cuit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAsignarCuitPageRoutingModule
  ],
  declarations: [FormAsignarCuitPage]
})
export class FormAsignarCuitPageModule {}
