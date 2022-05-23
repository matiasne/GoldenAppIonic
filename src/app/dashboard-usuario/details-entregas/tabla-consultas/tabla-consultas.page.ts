import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ngxCsv } from 'ngx-csv';
import { ContratosService } from 'src/app/Services/contratos.service';
import { EntregasService } from 'src/app/Services/entregas.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { FormFiltrosPage } from '../form-filtros/form-filtros.page';

@Component({
  selector: 'app-tabla-consultas',
  templateUrl: './tabla-consultas.page.html',
  styleUrls: ['./tabla-consultas.page.scss'],
})
export class TablaConsultasPage implements OnInit {

  public tabla:any = {}
  
  constructor(
    private router:Router,
    private modalCtrl:ModalController,
    private contratosService:ContratosService,
    private entregasService:EntregasService,
    private loadingService:LoadingService,
    private ngxCsv:ngxCsv
  ) { }

  ngOnInit() {

    this.loadingService.presentLoading();
    this.entregasService.obtener({},{fechaDesde:"2017-01-01",fechaHasta:"2021-05-19",cosecha:"20/21",contrato:"1876004678"}).subscribe((resp:any)=>{
      this.tabla = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.tabla)
    })
  }

  downloadCSV(){
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Your title',
      useBom: true,
      noDownload: true,
      headers: ["First Name", "Last Name", "ID"]
    };
   
    this.ngxCsv = new ngxCsv(this.tabla, "prueba", options);

    this.ngxCsv.getCsv();
  }

  

  

}
