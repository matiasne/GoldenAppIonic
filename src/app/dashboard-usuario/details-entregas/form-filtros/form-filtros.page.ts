import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Campana } from 'src/app/models/campanas';
import { Contrato } from 'src/app/models/contratos';
import { ContratosService } from 'src/app/Services/contratos.service';

@Component({
  selector: 'app-form-filtros',
  templateUrl: './form-filtros.page.html',
  styleUrls: ['./form-filtros.page.scss'],
})
export class FormFiltrosPage implements OnInit {

  public filtro = {
    fechaDesde:new Date(),
    fechaHasta:new Date(),
    cosecha:"",
    contrato:""
  }

  public campanas = []
  public contratosAll:Contrato[]
  public contratosSelect:Contrato[]

  public campanaSeleccionada:Campana
  
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  

  constructor(
    private modalCtrl:ModalController,
    private contratosService:ContratosService
  ) { 
    this.campanaSeleccionada = new Campana();

    this.contratosService.getTodos().subscribe((resp:any)=>{
      console.log(resp)
      this.contratosAll = resp.data;
    })

    this.campanas = [{
      id:"39",
      nombre:"17/18"
    },
    {
      id:"40",
      nombre:"18/19"
    },
    {
      id:"41",
      nombre:"19/20"
    },
    {
      id:"42",
      nombre:"20/21"
    },
    {
      id:"43",
      nombre:"21/22"
    }]
  }

  setearContratos(){
    if(this.contratosAll){
      this.contratosSelect = this.contratosAll.filter(contrato => { return contrato.ID_COSECHA == this.campanaSeleccionada.id});
      console.log(this.contratosSelect)
    }
    
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

  continuar(){
    this.filtro.cosecha = this.campanaSeleccionada.nombre
    this.modalCtrl.dismiss(this.filtro)
  }

}
