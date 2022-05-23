import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContratosService } from 'src/app/Services/contratos.service';
import { EntregasService } from 'src/app/Services/entregas.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { FormFiltrosPage } from '../form-filtros/form-filtros.page';

@Component({
  selector: 'app-tabla-totales',
  templateUrl: './tabla-totales.page.html',
  styleUrls: ['./tabla-totales.page.scss'],
})
export class TablaTotalesPage implements OnInit {

  public tablas = {
    totales:undefined,
    propios:undefined,
    terceros:undefined
  }

  constructor(
    private router:Router,
    private modalCtrl:ModalController,
    private contratosService:ContratosService,
    private entregasService:EntregasService,
    private loadingService:LoadingService
  ) { }

  ngOnInit() {

    this.loadingService.presentLoading();
    this.entregasService.totales({},{fechaDesde:"2017-01-01",fechaHasta:"2021-05-19",cosecha:"20/21",contrato:"1876004678"}).subscribe((resp:any)=>{
      this.tablas = resp.data;
      this.loadingService.dismissLoading();
      console.log(this.tablas)
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

        this.loadingService.presentLoading();
        this.entregasService.totales({},retorno.data).subscribe((resp:any)=>{
          this.tablas = resp.data;
          this.loadingService.dismissLoading();
          console.log(this.tablas)
        })

      }        
    });
    return await modal.present();
  }
}
