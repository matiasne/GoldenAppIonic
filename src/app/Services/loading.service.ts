import { Injectable } from "@angular/core"
import { LoadingController } from "@ionic/angular"

@Injectable({
    providedIn: "root"
})

export class LoadingService {

  private actualId = 0;
  private isLoading = false;
  
  constructor(
   private  loadingController:LoadingController
  ) {}

  presentLoading() {
      // Quizás no sea necesario. Lo dejamos por las dudas por ahora...
      this.actualId = Math.random()

      if(!this.isLoading){
          this.isLoading = true
      }

      this.loadingController.create({
          id:this.actualId.toString(),
          message: "Cargando",
          duration: 10000,
      }).then(a => {
          if(this.isLoading) {
              a.present()
          }

          return this.actualId.toString()
      })
  }

  async dismissLoading(id = undefined) {
      if(this.isLoading){
          this.isLoading = false

          this.loadingController.dismiss(null,null,id)
      }
  }
}
