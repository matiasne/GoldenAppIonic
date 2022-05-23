import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class EntregasService extends BaseCRUDService {

  constructor(
    public httpClient: HttpClient
  ) {
      super(httpClient)
      this.setEndpoint("categories")
  } 

  public obtener(params={},body = {}){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'application/x-www-form-urlencoded'
    });         
       
    this.httpParams = new HttpParams()
    Object.keys(params).forEach((key)=> {
        this.httpParams.append(key, params[key])
    })     

  
    const options ={
      headers: httpHeaders,
      params: params
    }

    console.log(options)
    console.log(body)

    return this.httpClient.post(environment.url+"includes/consultas/consulta.inc.php",body,options)
  }

  public totales(params={},body = {}){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'application/x-www-form-urlencoded'
    });         
       
    this.httpParams = new HttpParams()
    Object.keys(params).forEach((key)=> {
        this.httpParams.append(key, params[key])
    })     

  
    const options ={
      headers: httpHeaders,
      params: params
    }

    console.log(options)
    console.log(body)

    return this.httpClient.post(environment.url+"includes/consultas/consulta-promedios.php",body,options)
  }
}