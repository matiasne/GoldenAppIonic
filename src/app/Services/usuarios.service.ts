import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseCRUDService {

  constructor(
    public httpClient: HttpClient
  ) {
      super(httpClient)
      this.setEndpoint("categories")
  } 

  public buscar(params={},body = {}){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'application/x-www-form-urlencoded'
    });         
       
   /* this.httpParams = new HttpParams()
    Object.keys(params).forEach((key)=> {
        this.httpParams.append(key, params[key])
    })*/     

  
    const options ={
      headers: httpHeaders,
      params: params
    }

    console.log(options)
    console.log(body)

    return this.httpClient.post(environment.url+"includes/administracion/consulta-usuario.inc.php",body,options)
  }

  public cambiarContrasena(params={},body = {}){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'application/x-www-form-urlencoded'
    });         
       
   /* this.httpParams = new HttpParams()
    Object.keys(params).forEach((key)=> {
        this.httpParams.append(key, params[key])
    })*/     

  
    const options ={
      headers: httpHeaders,
      params: params
    }

    console.log(options)
    console.log(body)

    return this.httpClient.post(environment.url+"includes/consultas/cambio-contrasena.inc.php",body,options)
  }

  
  public asignarCuit(params={},body = {}){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'application/x-www-form-urlencoded'
    });         
         
    const options ={
      headers: httpHeaders,
      params: params
    }

    console.log(options)
    console.log(body)

    return this.httpClient.post(environment.url+"includes/administracion/signup-admin.inc.php",body,options)
  }

  

}
