import { AlertController } from '@ionic/angular';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  usuarioId = null;
  usuarioValidate: any;
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
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private afAuth: AngularFireAuth,
    public alertController: AlertController,
    private db: AngularFirestore
  ) { }

  ngOnInit() { // Primer metodo que se ejecuta al iniciar una pagina
  }

  onLogin(){
    const user1 = this.authService.onLogin(this.user);
    if (user1) {
      console.log('Exito el usuario existe');
      user1.then( session => {
        console.log(session.user.uid);
        this.usuarioId = session.user.uid;
        this.loadUsuario();
      });
    }
  }

  loadUsuario() {
    console.log("ID DE USUARIO: "+this.usuarioId);
    var result = this.db.collection('usuarios').ref.where('id','==',this.usuarioId);
    result.get().then((res) => {
      res.forEach( (doc) => {
        this.usuario = doc.data() as Usuario;
        console.log(this.usuario.email);
        console.log(doc.id,' => ', doc.data());
        if(this.usuario.status === "1") {
          if(this.usuario.rol === 1 ){
            this.router.navigateByUrl('/home');
          }else{
            this.router.navigateByUrl('/home-usuario');
          }
        } else {
            this.presentAlert();
        }
      });
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
