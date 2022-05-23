import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-form-cambiar-contrasena',
  templateUrl: './form-cambiar-contrasena.page.html',
  styleUrls: ['./form-cambiar-contrasena.page.scss'],
})
export class FormCambiarContrasenaPage implements OnInit {

  @Input() usuario
  public contrasena = "";
  public confContrasena ="";
  constructor(
    private modalCtrl:ModalController,
    private usuariosService:UsuariosService
  ) { }

  ngOnInit() {
  }

  cambiar(){
    this.usuariosService.cambiarContrasena({},{"usuario":this.usuario.username.trim(),"contrasena-nueva":this.contrasena,"conf-contrasena-nueva":this.confContrasena}).subscribe(data=>{
      console.log(data)
    })
    this.modalCtrl.dismiss(this.contrasena)
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

}
