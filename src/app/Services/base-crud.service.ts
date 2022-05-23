import { tap } from "rxjs/operators"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { LoadingController } from "@ionic/angular"

import { environment } from "src/environments/environment"
import { LoadingService } from "./loading.service"
import { ToastService } from "./toast.service"

@Injectable({
    providedIn: "root"
})

export class BaseCRUDService{

  public endpoint = "";

  public url = ""; 

  public toastService:ToastService;

  public loadingService:LoadingService;

  public httpParams = new HttpParams();

  constructor(
    public httpClient:HttpClient,
  ){    
      this.url = environment.url
      const loadingCtrl = new LoadingController()
      this.loadingService = new LoadingService(loadingCtrl)
  } 

  public setEndpoint(endpoint){
      this.endpoint = endpoint   
  }  

  public getEndpoint(){
      return this.url+this.endpoint
  }
  
  public getAll(params = {page:1,perPage:20}){    
      const lid = this.loadingService.presentLoading()

      this.httpParams = new HttpParams()
      Object.keys(params).forEach((key)=> {
          this.httpParams = this.httpParams.append(key, params[key])
 
      }) 

      const options ={
          params: this.httpParams
      }

      return this.httpClient.get(this.getEndpoint(),options).pipe(tap(() =>{ 
          this.loadingService.dismissLoading(lid)      
      },()=>{
          this.loadingService.dismissLoading(lid)  
      }))
  }

  public getOne(id,params ={}){  
      const lid = this.loadingService.presentLoading()

      this.httpParams = new HttpParams()
      Object.keys(params).forEach((key)=> {
          this.httpParams = this.httpParams.append(key, params[key])
      }) 

      const options ={
          params: this.httpParams
      }

      return this.httpClient.get(this.getEndpoint()+"/"+id,options).pipe(tap(() =>{    
          this.loadingService.dismissLoading(lid)      
      }, ()=>{
          this.loadingService.dismissLoading(lid)  
      }))
  }

  public createOne(params={},body = {}){  
      const lid = this.loadingService.presentLoading()  

      this.httpParams = new HttpParams()
      Object.keys(params).forEach((key)=> {
          this.httpParams.append(key, params[key])
      }) 

      const options ={
          params: this.httpParams
      }

      return this.httpClient.post(this.getEndpoint(),body,options).pipe(tap(() =>{
          this.loadingService.dismissLoading(lid)      
      }, ()=>{
          this.loadingService.dismissLoading(lid)  
      }))
  }

  public updateOne(id, params={}, body={}){  
      const lid = this.loadingService.presentLoading()  

      this.httpParams = new HttpParams()
      Object.keys(params).forEach((key)=> {
          this.httpParams.append(key, params[key])
      }) 

      const options ={
          params: this.httpParams
      }

      return this.httpClient.put(this.getEndpoint() + "/" + id, body,options).pipe(tap(() =>{   
          this.loadingService.dismissLoading(lid)      
      }, ()=>{
          this.loadingService.dismissLoading(lid)  
      }))
  }

  public deleteOne(id, params={}){    
      const lid = this.loadingService.presentLoading()

      this.httpParams = new HttpParams()
      Object.keys(params).forEach((key)=> {
          this.httpParams.append(key, params[key])
      }) 

      return this.httpClient.delete(this.getEndpoint() + "/" + id, params).pipe(tap(() =>{      
          this.loadingService.dismissLoading(lid)      
      }, ()=>{
          this.loadingService.dismissLoading(lid)  
      }))
  }
}
