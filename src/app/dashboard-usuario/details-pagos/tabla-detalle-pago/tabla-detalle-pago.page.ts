import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { LoadingService } from 'src/app/Services/loading.service';
import { PagosService } from 'src/app/Services/pagos.service';

@Component({
  selector: 'app-tabla-detalle-pago',
  templateUrl: './tabla-detalle-pago.page.html',
  styleUrls: ['./tabla-detalle-pago.page.scss'],
})
export class TablaDetallePagoPage implements OnInit {

  public tabla:any = {}

  private idRecibo ="";
  private nroRecibo="";

  constructor(
    private pagosService:PagosService,
    private router:ActivatedRoute,
    private platform:Platform,
    private loadingService:LoadingService
  ) { 

    this.idRecibo = this.router.snapshot.params.idRecibo;
    this.nroRecibo = this.router.snapshot.params.nroRecibo;
  }

  ngOnInit() {

    this.pagosService.crearIngresosBrutos({ID_DETALLE:this.nroRecibo},{ID_DETALLE:this.nroRecibo}).subscribe(data=>{
      console.log(data)
    })

    this.pagosService.crearOrdenPago({ID_DETALLE:this.nroRecibo},{ID_DETALLE:this.nroRecibo}).subscribe(data=>{
      console.log(data)
    })

    this.pagosService.crearRetencionGanancia({ID_DETALLE:this.nroRecibo},{ID_DETALLE:this.nroRecibo}).subscribe(data=>{
      console.log(data)
    })

    this.loadingService.presentLoading();
    this.pagosService.obtenerDetalle({},{ID_DETALLE:this.idRecibo}).subscribe((resp:any)=>{
      this.tabla = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.tabla)
    })

  }

  abrir(row){   

    if(this.platform.is('mobile')) { 
      this.pagosService.downloadFile(row.ID_IMPUESTO_REGIMEN, this.nroRecibo).subscribe(data=>{
        console.log(data)
      })
    }
    else{

      let url = "";
      if(row.ID_IMPUESTO_REGIMEN == 2){
        url = 'http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+this.nroRecibo+'-OP.pdf';
      }
      else if(row.ID_IMPUESTO_REGIMEN == 31){
        url='http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+this.nroRecibo+'-RG.pdf';
      }
      else {
        url='http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+this.nroRecibo+'-RIB.pdf';
      }

      window.open(url);
    }
    

    

  }

  


}
