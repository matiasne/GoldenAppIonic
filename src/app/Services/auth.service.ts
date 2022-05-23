import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseCRUDService {

  public nombre = "";

  public authenticationState = new BehaviorSubject(false);

  constructor(
    public httpClient: HttpClient
  ) {
      super(httpClient)
      if(localStorage.getItem('token')){
       this.authenticationState.next(true)
      }
      else{
        this.authenticationState.next(false)
      }
  } 

  public login(params={},body = {}){


    let Url = environment.url+"includes/usuarios/usuarios.php/login" ;

    let httpHeaders = new HttpHeaders({
    //  'Access-Control-Allow-Methods':'*',
	//		'Access-Control-Allow-Origin':'*',
			'Content-Type':'application/x-www-form-urlencoded',
   
    });      

    this.httpParams = new HttpParams()
    Object.keys(params).forEach((key)=> {
        this.httpParams.append(key, params[key])
    })       

    let options = {
      headers: httpHeaders,
      params: this.httpParams
    };    
    
    let id = this.loadingService.presentLoading();
    this.httpClient.post(Url,body,options).subscribe(
      (response:any) =>{
        console.log(response)
        if(response.code == "200"){
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('admin',response.data.admin)
          localStorage.setItem('razonSocial',response.data.razonSocial)
          this.authenticationState.next(true)
        }
        this.loadingService.dismissLoading(id);
       
    }, 
    error=>{
      console.log(error);
      this.loadingService.dismissLoading(id);
      this.authenticationState.next(false)
    });


  }

  validarToken(params={},body = {}){

    let Url = environment.url+"includes/usuarios/usuarios.php/tokenInfo" ;

    let httpHeaders = new HttpHeaders({
    //  'Access-Control-Allow-Methods':'*',
	//		'Access-Control-Allow-Origin':'*',
			'Content-Type':'application/x-www-form-urlencoded',
   
    });      

    this.httpParams = new HttpParams()
    Object.keys(params).forEach((key)=> {
        this.httpParams.append(key, params[key])
    })       

    let options = {
      headers: httpHeaders,
      params: this.httpParams
    };    
    
    this.httpClient.post(Url,body,options).subscribe(
      (response:any) =>{
        
        console.log(response)
        if(response.code == "200"){
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('admin',response.data.admin)
          this.authenticationState.next(true)
        }
        else
          this.authenticationState.next(false)
    }, 
    error=>{
      console.log(error);
      this.authenticationState.next(false)
    });
  }

  observerAuthState(){
    return this.authenticationState.asObservable()
  }

  logout = ()=>{
    localStorage.setItem('token',"");
    localStorage.setItem('admin',"");
    this.authenticationState.next(false)
  }

  
}
