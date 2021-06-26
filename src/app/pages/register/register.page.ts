import { UsuarioService } from './../../services/usuario.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Usuario } from './../../models/usuario.model';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();

  usuario: Usuario = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    curp: '',
    numeroControl: '',
    status: "3",
    rol: 2
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private nav: NavController,
    private afAuth: AngularFireAuth,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  register() {

  }

  onRegister(){
    this.authService.onRegister(this.user).then ( user => {
      if (user.user) {
        console.log('Exito aqui mandar a guardar a la base de usuarios');
        this.usuario.id = user.user.uid;
        this.usuarioService.addUsuario(user.user.uid,this.usuario).then(() => {
          console.log('Exito se guardo nuevo usuario en tabla usuario');
          this.router.navigateByUrl('/register-complete');
        }); 
      }
    })
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario',
      subHeader: 'Usuario Inactivo',
      message: 'El usuario se registro con exito, favor de contactar con el administrador para habilitar su acceso.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
