import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContratosService } from 'src/app/Services/contratos.service';
import { CsvService } from 'src/app/Services/csv.service';
import { EntregasService } from 'src/app/Services/entregas.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { FormFiltrosPage } from './form-filtros/form-filtros.page';

@Component({
  selector: 'app-details-entregas',
  templateUrl: './details-entregas.page.html',
  styleUrls: ['./details-entregas.page.scss'],
})
export class DetailsEntregasPage implements OnInit {

  public tablaConsultas:any = {}
  public tablasT = {
    totales:undefined,
    propios:undefined,
    terceros:undefined
  }
  public filtros = {};
  public tabActive = "consultas";
  constructor(
    private modalCtrl:ModalController,
    private entregasService:EntregasService,
    private loadingService:LoadingService,
    private excelService:ExcelService
  ) { }

  ngOnInit(
    
  ) { 
  } 

  viewConsultas(){
    this.tabActive = "consultas"

    this.loadingService.presentLoading();
    this.entregasService.obtener({},this.filtros).subscribe((resp:any)=>{
      this.tablaConsultas = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.tablaConsultas)
    },err=>{
      this.loadingService.dismissLoading();
    })

  }

  viewTotales(){
    this.tabActive = "totales"
    this.loadingService.presentLoading();
    this.entregasService.totales({},this.filtros).subscribe((resp:any)=>{
      this.tablasT = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.tablasT)
    },err=>{
      this.loadingService.dismissLoading();
    })

  }

  async openFiltros(){
    const modal = await this.modalCtrl.create({
      component: FormFiltrosPage      
    });
    modal.onDidDismiss()
    .then((retorno:any) => {
      if(retorno.data){
        console.log(retorno.data)
        this.filtros = retorno.data;
        if(this.tabActive == "consultas"){
          this.loadingService.presentLoading();
          this.entregasService.obtener({},retorno.data).subscribe((resp:any)=>{
            this.tablaConsultas = resp.data;
           
            this.loadingService.dismissLoading();
            console.log(this.tablaConsultas)
          },err=>{
            this.loadingService.dismissLoading();
          })
        }

        if(this.tabActive == "totales"){
          this.loadingService.presentLoading();
          this.entregasService.totales({},retorno.data).subscribe((resp:any)=>{
            this.tablasT = resp.data;
            this.loadingService.dismissLoading();
            console.log(this.tablasT)
          },err=>{
            this.loadingService.dismissLoading();
          })
        }    

      }        
    });
    return await modal.present();
  }


  downloadTablaConsulta(){
    this.excelService.downloadTable(this.tablaConsultas,"cartasPorte")
  }  

  downloadTablaTotalesPropios(){
    this.excelService.downloadTable(this.tablasT.propios,"totalesPropios")
  } 

  downloadTablaTotalesTerceros(){
    this.excelService.downloadTable(this.tablasT.terceros,"totalesTerceros")
  } 

  downloadTablaTotales(){
    this.excelService.downloadTable(this.tablasT.totales,"totales")
  } 

}
