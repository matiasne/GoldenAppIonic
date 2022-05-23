import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-form-asignar-cuit',
  templateUrl: './form-asignar-cuit.page.html',
  styleUrls: ['./form-asignar-cuit.page.scss'],
})
export class FormAsignarCuitPage implements OnInit {

  public cuit = "";

  @Input() usuario

  constructor(
    private modalCtrl:ModalController,
    private usuarioService:UsuariosService,
    private loadingService:LoadingService
  ) { }

  ngOnInit() {
  }

  cambiar(){ 
    this.loadingService.presentLoading();
    this.usuarioService.asignarCuit({},{"CUIT": this.cuit, "USUARIO": this.usuario.username.trim() }).subscribe((data:any)=>{
      this.loadingService.dismissLoading();
    })
    this.modalCtrl.dismiss(this.cuit)
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }


}
