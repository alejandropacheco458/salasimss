import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud.model';
import { SalicitudService } from 'src/app/services/salicitud.service';

@Component({
  selector: 'app-solicitudes-usuario',
  templateUrl: './solicitudes-usuario.page.html',
  styleUrls: ['./solicitudes-usuario.page.scss'],
})
export class SolicitudesUsuarioPage implements OnInit {

  usuarioId = null;

  solicitudes: Solicitud[];

  constructor(
    private solicitudesService: SalicitudService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user){
        console.log("User ID: "+user.uid);
        this.usuarioId = user.uid;
        this.onFindSolicitudes();
      }
   });
  }

  onFindSolicitudes(){
    this.solicitudesService.getSolicitudes().subscribe(
      solicitudes => {
        this.solicitudes = solicitudes.filter( sol => sol.usuario === this.usuarioId);
        console.log(this.solicitudes);
      }
    )
  }

  onValidarUsuario(estatus: string,sala: string,fecha: string,usuario: string, solicitud: string) {
    if(fecha.toString() >= this.datePipe.transform(new Date(), 'yyyy-MM-dd') && (estatus==='1' || estatus==='2')) {
      if (solicitud !== '') {
        if (usuario === this.usuarioId) {
          this.router.navigate(['/solicitud-cancelar', fecha, sala, solicitud]);
        } 
      } 
    } else {
      this.router.navigate(['/solicitud-consulta', fecha, sala, solicitud]);
    }
  }       
}
