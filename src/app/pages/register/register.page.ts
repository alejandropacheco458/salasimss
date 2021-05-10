import { UsuarioService } from './../../services/usuario.service';
import { LoadingController, NavController } from '@ionic/angular';
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
    status: "2",
    rol: 2
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private nav: NavController,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.authService.onRegister(this.user);
    if (user) {

      console.log('Exito aqui mandar a guardar a la base de usuarios');

      const loading = await this.loadingController.create({
        message: 'Saving.....'
      });

      await loading.present();




      this.afAuth.authState.subscribe(user => {
        if (user){
          console.log("User ID: "+user.uid);



          this.usuarioService.addUsuario(user.uid,this.usuario).then(() => {
            loading.dismiss();
          });

          console.log('Exito se guardo nuevo usuario en tabla usuario');
          this.router.navigateByUrl('/home-usuario');
          ///this.usuarioId = user.uid;
          //this.loadUsuario();
        }
        else{

        }
     })


    }
  }

}
