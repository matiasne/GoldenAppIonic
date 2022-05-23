import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading.service';
import { PagosService } from 'src/app/Services/pagos.service';
import { FormFiltrosPage } from './form-filtros/form-filtros.page';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-details-pagos',
  templateUrl: './details-pagos.page.html',
  styleUrls: ['./details-pagos.page.scss'],
})
export class DetailsPagosPage implements OnInit {

  public tabla:any = {}

  constructor(
    private modalCtrl:ModalController,
    private pagosService:PagosService,
    private route:Router,
    private actionSheetController:ActionSheetController,
    public platform:Platform,
    public loadingService:LoadingService
  ) { 
    this.tabla = {}
  }

  ngOnInit() {

    this.loadingService.presentLoading();
    this.pagosService.obtenerTodos({},{fechaDesde:"2017-01-01",fechaHasta:"2021-05-19"}).subscribe((resp:any)=>{
      this.tabla = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.tabla)
    })

  }

  async openFiltros(){
    const modal = await this.modalCtrl.create({
      component: FormFiltrosPage      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        console.log(retorno.data)

        this.pagosService.obtenerTodos({},retorno.data).subscribe((resp:any)=>{
          this.tabla = resp.data;
          console.log(this.tabla)
        })

      }        
    });
    return await modal.present();
  }
  
  abrir(row){
    this.route.navigate(['dashboard-usuario/details-pagos/tabla-detalle-pago',{idRecibo:row.ID_CC_RECIBO, nroRecibo:row.NO_RECIBO}])
  }

  async select(row) {
    const actionSheet = await this.actionSheetController.create({
      header: "Que PDF desea ver?",
      buttons: [{
        text: 'Orden de Pago',
        handler: () => {
          this.pagosService.crearOrdenPago({},{ID_DETALLE:row.NO_RECIBO,usuario:"30712495142"}).subscribe(data=>{
            let id = this.loadingService.presentLoading()
            setTimeout(()=>{this.abrirPDF(2,row); this.loadingService.dismissLoading(id)},3000)
          },err=>{
            let id = this.loadingService.presentLoading()
            setTimeout(()=>{this.abrirPDF(2,row); this.loadingService.dismissLoading(id)},3000)
          })
        }
      },
      {
        text: 'Retención de Ganancias',
        handler: () => {
          this.pagosService.crearRetencionGanancia({},{ID_DETALLE:row.NO_RECIBO,usuario:"30712495142"}).subscribe(data=>{
            let id = this.loadingService.presentLoading()
            setTimeout(()=>{this.abrirPDF(31,row); this.loadingService.dismissLoading(id)},3000)
            
          },err=>{
            let id = this.loadingService.presentLoading()
            setTimeout(()=>{this.abrirPDF(31,row); this.loadingService.dismissLoading(id)},3000)
            
          })
        }
      },
      {
        text: 'Retención de Ingresos Brutos',
        handler: () => {
          this.pagosService.crearIngresosBrutos({},{ID_DETALLE:row.NO_RECIBO,usuario:"30712495142"}).subscribe(data=>{
            let id = this.loadingService.presentLoading()
            setTimeout(()=>{this.abrirPDF(3,row); this.loadingService.dismissLoading(id)},3000)
          },err=>{
            let id = this.loadingService.presentLoading()
            setTimeout(()=>{this.abrirPDF(3,row); this.loadingService.dismissLoading(id)},3000)
          })
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  abrirPDF(tipo, row){   

    if(this.platform.is('mobile')) { 
      this.pagosService.downloadFile(tipo, row.NO_RECIBO).subscribe(data=>{
        console.log(data)
      })
    }
    else{

      let url = "";
      if(tipo == 2){
        url = 'http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+row.NO_RECIBO+'-OP.pdf';
      }
      else if(tipo == 31){
        url='http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+row.NO_RECIBO+'-RG.pdf';
      }
      else {
        url='http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+row.NO_RECIBO+'-RIB.pdf';
      }

      window.open(url);
    }
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
   

  }
}
