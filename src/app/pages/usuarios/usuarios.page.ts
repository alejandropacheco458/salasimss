import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: Usuario[];
  texto = '';

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit() {

    this.usuariosService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      }
    )
  }

  buscar( event ){
    this.texto = event.detail.value;
  }



}
