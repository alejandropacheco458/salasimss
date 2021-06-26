import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios-autorizar',
  templateUrl: './usuarios-autorizar.page.html',
  styleUrls: ['./usuarios-autorizar.page.scss'],
})
export class UsuariosAutorizarPage implements OnInit {

  usuarios: Usuario[];

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios.filter( sol => sol.status === '3');
      }
    )
  }

}
