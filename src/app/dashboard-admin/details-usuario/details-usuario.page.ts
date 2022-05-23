import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ArchivosService } from 'src/app/Services/archivos.service';
import { environment } from 'src/environments/environment';
import { FormAsignarCuitPage } from '../form-asignar-cuit/form-asignar-cuit.page';
import { FormCambiarContrasenaPage } from '../form-cambiar-contrasena/form-cambiar-contrasena.page';

@Component({
  selector: 'app-details-usuario',
  templateUrl: './details-usuario.page.html',
  styleUrls: ['./details-usuario.page.scss'],
})
export class DetailsUsuarioPage implements OnInit {

  public file:any
  
  public tabla:any = {
    columns:[
      {name:"Archivo",prop:"a"},
      {name:"Borrar",prop:"borrar"}
    ]
  }
  

  @Input() usuario
  constructor(
    private modalCtrl:ModalController,
    private archivosServices:ArchivosService,
    private platform:Platform,
    private httpClient:HttpClient
  ) { }

  ngOnInit() {
    console.log(this.usuario)
    

  }

  ionViewDidEnter(){
    this.obtenerArchivos()
  }

  obtenerArchivos(){
    this.archivosServices.obtener({},{idEntidad:this.usuario.ID_ENTIDAD.trim()}).subscribe((resp:any)=>{
      let filas = []
      console.log(resp)
      resp.data.forEach(element => {
        console.log(element)
        if(element != "." && element != ".."){
          let fila = {
            a:element
          }
          filas.push(fila);
        }
       
       
      });
      this.tabla.rows = filas;
      console.log(this.tabla.rows)

    })
  }
  setFile(event){
    this.file = (event.target as HTMLInputElement).files[0];
  }

  async openCambiarContrasena(){
    const modal = await this.modalCtrl.create({
      component: FormCambiarContrasenaPage,
      componentProps:{usuario:this.usuario}      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        alert(retorno.data)
        this.usuario.contrasena = retorno.data
        //update al servidor
      }        
    });
    return await modal.present();
    
  }

  async openAsignarCuit(){
    const modal = await this.modalCtrl.create({
      component: FormAsignarCuitPage,
      componentProps:{usuario:this.usuario}          
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        alert(retorno.data)
        this.usuario.cuit = retorno.data
        //update al servidor
      }        
    });
    return await modal.present();
  }

  abrir(row){   

    let url=environment.url+'includes/uploads/'+this.usuario.ID_ENTIDAD.trim()+'/'+row.a;

    if(this.platform.is('mobile')) { 
      this.httpClient.get(url).subscribe(data=>{
        console.log(data)
      })
    }
    else{
      window.open(url);
    }
  }

  borrar(row){
    this.archivosServices.borraArchivo({},{"nombreUsuario":this.usuario.ID_ENTIDAD,"nombreArchivo":row.name}).subscribe(data=>{
      console.log(data)
    })
  }

  subirArchivo(){

    this.archivosServices.subirArchivo(this.usuario.ID_ENTIDAD,this.file).subscribe(data=>{
      console.log(data)
      this.obtenerArchivos()
    })
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }
}
