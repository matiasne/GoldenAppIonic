import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService extends BaseCRUDService {

  constructor(
    public httpClient: HttpClient
  ) {
      super(httpClient)
  } 

  public obtenerTodos(params={},body = {}){  

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

   return this.httpClient.post(environment.url+"includes/consultas/consulta-pagos.php",body,options)
  }

  public obtenerDetalle(params={},body = {}){  

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

   return this.httpClient.post(environment.url+"includes/consultas/consulta-detalles-pagos.php",body,options)
  }

  crearOrdenPago(params={},body = {}){
    
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

   //Ejecuta en el servidor la creación de los PDF
   return this.httpClient.post("http://www.goldenpeanut.com.ar/descarga/creacion-pdf/creacion-orden-pago-v2.php",body,options)
  }

  crearRetencionGanancia(params={},body = {}){
    
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

   //Ejecuta en el servidor la creación de los PDF
   return this.httpClient.post("http://www.goldenpeanut.com.ar/descarga/creacion-pdf/creacion-retencion-ganancias-v2.php",body,options)
  }

  crearIngresosBrutos(params={},body = {}){
    
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

   //Ejecuta en el servidor la creación de los PDF
   return this.httpClient.post("http://www.goldenpeanut.com.ar/descarga/creacion-pdf/creacion-ingresos-brutos-v2.php",body,options)
  }

  public downloadFile(regimen:any,numeroPagoPDF: string): Observable<any> {

    let url = "";
    if(regimen == 2){
      url = 'http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+numeroPagoPDF+'-OP.pdf';
    }
    else if(regimen == 31){
      url='http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+numeroPagoPDF+'-RG.pdf';
    }
    else {
      url='http://www.goldenpeanut.com.ar/descarga/creacion-pdf/'+numeroPagoPDF+'-RIB.pdf';
    }

    return this.httpClient.get(url)
  }
}
