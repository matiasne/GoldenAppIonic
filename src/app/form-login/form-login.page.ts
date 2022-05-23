import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.page.html',
  styleUrls: ['./form-login.page.scss'],
})
export class FormLoginPage implements OnInit {

  public email:string;
  public password:string;

  @ViewChild('passwordEyeRegister') passwordEye;
  @ViewChild('passwordEyeConfirmation') passwordEyeConfirm;

  passwordTypeInput1  =  'password';
  passwordTypeInput2  =  'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword1  =  'eye-off';
  iconpassword2  =  'eye-off';

  public devWidth

  constructor(
    private authService:AuthService,
    private alertController: AlertController,
    private router:Router,
    private platform:Platform
  ) { 
    this.devWidth = this.platform.width();
  }

  ngOnInit() {
    this.authService.nombre = "Matias";
  }
 
  login(){
    this.authService.login({nombre:this.email.trim(),contrasena:this.password.trim()},{nombre:this.email.trim(),contrasena:this.password.trim()})    
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  togglePasswordMode() {
    this.passwordTypeInput1  =  this.passwordTypeInput1  ===  'text'  ?  'password'  :  'text';
    this.iconpassword1  =  this.iconpassword1  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

}
