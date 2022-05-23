import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contrato } from '../models/contratos';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ContratosService extends BaseCRUDService {

  constructor(
    public httpClient: HttpClient
  ) {
      super(httpClient)
      this.setEndpoint("categories")
  } 

  public getTodos(params={},body = {}):Observable<Contrato[]>{  

    let httpHeaders = new HttpHeaders({
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
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

    return this.httpClient.post<Contrato[]>(environment.url+"includes/consultas/opciones-contratos.php",body,options)
  }
}
