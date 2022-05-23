import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-filtros',
  templateUrl: './form-filtros.page.html',
  styleUrls: ['./form-filtros.page.scss'],
})
export class FormFiltrosPage implements OnInit {

  public filtro = {
    fechaDesde:new Date(),
    fechaHasta:new Date(),
    ID_ENTIDADSQL:"612588",
  }

  constructor(
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

  continuar(){
    this.modalCtrl.dismiss(this.filtro)
  }

}
