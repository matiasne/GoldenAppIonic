import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../Services/loading.service';
import { UsuariosService } from '../Services/usuarios.service';
import { DetailsUsuarioPage } from './details-usuario/details-usuario.page';
import { FormAsignarCuitPage } from './form-asignar-cuit/form-asignar-cuit.page';
import { FormCambiarContrasenaPage } from './form-cambiar-contrasena/form-cambiar-contrasena.page';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {

  public usuariosEncontrado = []

  public palabraFiltro="";

  public admin = "0";

  constructor(
    private router:Router,
    private modalCtrl:ModalController,
    private usuarioService:UsuariosService,
    private loadingService:LoadingService
  ) { 

    this.admin = localStorage.getItem('admin')

  }

  ngOnInit() {
  }

  buscar(){
    this.usuariosEncontrado = []
    this.loadingService.presentLoading();
    this.usuarioService.buscar({},{"usuario-nombre":this.palabraFiltro}).subscribe((resp:any)=>{
      this.usuariosEncontrado = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.usuariosEncontrado)
    })
  }

  

  async openDetails(usuario){
    const modal = await this.modalCtrl.create({
      component: DetailsUsuarioPage,
      componentProps:{usuario:usuario}      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
       
      }        
    });
    return await modal.present();
  }

}
