import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService extends BaseCRUDService {

  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient)
    
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

    return this.httpClient.post(environment.url+"includes/administracion/obtenerArchivos.php",body,options)
  }

  public obtenerMis(params={},body = {}){  

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

    return this.httpClient.post(environment.url+"includes/administracion/obtenerMisArchivos.php",body,options)
  }

  
  public subirArchivo(nombreUsuario:any,file:File){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'multipart/form-data;'
    });         
         
    const options ={
      headers: httpHeaders
    }

    

    
    const formData: FormData = new FormData();
    formData.append('file', file[0], file[0].name);
    formData.append('nombreUsuario', nombreUsuario);


    return this.httpClient.post(environment.url+"includes/administracion/upload.php",formData)
  }

  public borraArchivo(params={},body = {}){  

    let httpHeaders = new HttpHeaders({
       'Content-Type':'application/x-www-form-urlencoded'
    });         
         
    const options ={
      headers: httpHeaders,
      params: params
    }

    console.log(options)
    console.log(body)

    return this.httpClient.post(environment.url+"includes/administracion/eliminarArchivo.php",body,options)
  }
}
