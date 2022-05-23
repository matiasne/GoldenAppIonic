import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCambiarContrasenaPageRoutingModule } from './form-cambiar-contrasena-routing.module';

import { FormCambiarContrasenaPage } from './form-cambiar-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCambiarContrasenaPageRoutingModule
  ],
  declarations: [FormCambiarContrasenaPage]
})
export class FormCambiarContrasenaPageModule {}
