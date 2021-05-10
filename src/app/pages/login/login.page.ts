import { AlertController } from '@ionic/angular';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  usuarioId = null;
  usuario: Usuario = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    curp: '',
    numeroControl: '',
    status: "2",
    rol: 2
  }

  constructor(
    private authService: AuthService,       // Firebase App Server and DB  -> AngularFireAuth
    private router: Router,                 // Enrrutador para las paginas adelante atras etc 
    private usuarioService: UsuarioService, // Control de usuarios en aplicacion 
    private afAuth: AngularFireAuth,        // Recibe respuesta de AuthService
    public alertController: AlertController // Manejo de alertas
  ) { }

  ngOnInit() { // Primer metodo que se ejecuta al iniciar una pagina
  }

  onLogin(){
    this.usuario = {
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      curp: '',
      numeroControl: '',
      status: "2",
      rol: 2
    };
    const user = this.authService.onLogin(this.user);
    if (user) {
      console.log('Exito el usuario existe');
      this.afAuth.authState.subscribe(userOne => {
        if (userOne){
          console.log("User ID: "+userOne.uid);
          this.usuarioId = userOne.uid;
          this.loadUsuario();
        }
        else{

        }
     })
    }
  }

  loadUsuario() {
    console.log("ID DE USUARIO: "+this.usuarioId);

    this.usuarioService.getUsuario(this.usuarioId).subscribe( res => {
      console.log("RESULTADO:  "+JSON.stringify(res));
      this.usuario = res;
      console.log("usuario: "+this.usuario);
      if(this.usuario.status === "1") {
        if(this.usuario.rol === 1 ){
          this.router.navigateByUrl('/home');
          return;
        }else{
          this.router.navigateByUrl('/home-usuario');
          return;
        }
      } else {

          this.presentAlert();

          return;

      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario',
      subHeader: 'Usuario Inactivo',
      message: 'El usuario ingresado esta inactivo, contacte al administrador para poder acceder.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
