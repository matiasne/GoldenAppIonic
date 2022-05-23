import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.page.html',
  styleUrls: ['./dashboard-usuario.page.scss'],
})
export class DashboardUsuarioPage implements OnInit {

  public razonSocial = "";
  public admin = "0";
  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
   
  }
  

  ionViewDidEnter(){
    this.razonSocial = localStorage.getItem('razonSocial')
    this.admin = localStorage.getItem('admin')
  }

  openEntrega(){
    this.router.navigate(['dashboard-usuario/details-entregas'])
  }

  openPagos(){
    this.router.navigate(['dashboard-usuario/details-pagos'])
  }

  openDocumentos(){
    this.router.navigate(['dashboard-usuario/details-documentos'])
  }

  openAdmin(){
    this.router.navigate(['dashboard-admin'])
  }

  logout(){
    this.authService.logout()
  }

}
