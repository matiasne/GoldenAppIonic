import { catchError, tap } from "rxjs/operators"
import { throwError, Observable } from "rxjs"
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"

import { ToastService } from "./toast.service"
import { AuthService } from "./auth.service"

@Injectable({
    providedIn: "root"
})

export class AuthInterceptorService implements HttpInterceptor {

    constructor(
  //  private authService:AuthService,
    private router:Router,
    private toastService:ToastService,
    ) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        const token:string = localStorage.getItem('token')

        let request = req

        if (token) {
            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${ token }`
                }
            })
        }

        return next.handle(request).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body.code != "200"){
                        this.toastService.mensaje(evt.body.message)
                    }
                }
            })
        )
    }

    public handleError(error:HttpErrorResponse):Observable<HttpEvent<any>> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", JSON.parse(error.error.message))
            alert(error.error.message)
        }

        
   
        if (error.status === 0) {      
            this.toastService.mensaje("¡Ups!", "No hay conexión a internet.")
        } 

        if (error.status === 401) {
            this.toastService.mensaje(error.error.message, "Tu sesión expiró. Por favor volvé a iniciar sesión.", "danger")
            //this.authService.logout()
        }

        if (error.status === 422) {
            let mensaje = ""
            Object.keys(error.error.errors).forEach(key=> {
                mensaje += error.error.errors[key][0] + "\n"        
            })
            this.toastService.mensaje(error.error.message, mensaje, "danger")
        } 

        if (error.status > 499) {
            this.toastService.mensaje(error.error.message, "Ocurrió un error inesperado en el servidor. Por favor intentá de nuevo más tarde.", "danger")
        } 
   
        return throwError(error)
    }
}
