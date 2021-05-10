import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

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

  usuarioId = null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];
    if (this.usuarioId) {
      this.loadUsuario();
    }
  }

  async loadUsuario() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.usuarioService.getUsuario(this.usuarioId).subscribe( res => {
      loading.dismiss();
      this.usuario = res;
    });
  }

  async saveUsuario() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();
    if (this.usuarioId) {
      //
      this.usuarioService.updateUsuario(this.usuario, this.usuarioId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/usuarios');
      })
    } else {
      /*this.usuarioService.addUsuario(this.usuario).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/usuarios');
      })*/
    }
  }

  onRemove(idUsuario: string) {
    console.log(idUsuario);
    this.usuarioService.removeUsuario(idUsuario);
  }

}
