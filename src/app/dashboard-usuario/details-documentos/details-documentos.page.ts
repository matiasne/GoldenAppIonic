import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { ArchivosService } from 'src/app/Services/archivos.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-documentos',
  templateUrl: './details-documentos.page.html',
  styleUrls: ['./details-documentos.page.scss'],
})
export class DetailsDocumentosPage implements OnInit {

  public tabla:any = {
    columns:[
      {name:"Archivo",prop:"a"}
    ]
  }

  public idEntidad = 0;
  

  constructor(
    public archivosServices:ArchivosService,
    public httpClient: HttpClient,
    public platform:Platform,
    public loadingService:LoadingService
  ) { }

  ngOnInit() {
    console.log("!!!")
    this.loadingService.presentLoading();
    this.archivosServices.obtenerMis({},{}).subscribe((resp:any)=>{
      let filas = []
     this.loadingService.dismissLoading()
      this.idEntidad = resp.idEntidad;

      if(resp.data){
        resp.data.forEach(element => {
          console.log(element)
          if(element != "." && element != ".."){
            let fila = {
              a:element,
              href:environment.url+'includes/uploads/'+this.idEntidad+'/'+element
            }
            filas.push(fila);
          }      
        });
      }
      
      this.tabla.rows = filas;
      

    })

  }

  abrir(row){   

    let url=environment.url+'includes/uploads/'+this.idEntidad+'/'+row.a;

    if(this.platform.is('mobile')) { 
      this.httpClient.get(url).subscribe(data=>{
        console.log(data)
      })
    }
    else{
      window.open(url);
    }
  }
}
