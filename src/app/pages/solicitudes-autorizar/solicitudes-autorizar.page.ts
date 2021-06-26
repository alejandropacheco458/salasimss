import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Solicitud } from 'src/app/models/solicitud.model';
import { SalaService } from 'src/app/services/sala.service';
import { SalicitudService } from 'src/app/services/salicitud.service';

@Component({
  selector: 'app-solicitudes-autorizar',
  templateUrl: './solicitudes-autorizar.page.html',
  styleUrls: ['./solicitudes-autorizar.page.scss'],
})
export class SolicitudesAutorizarPage implements OnInit {

  solicitudes: Solicitud[];

  constructor(
    private salaService: SalaService,
    private solicitudesService: SalicitudService,
    private datePipe: DatePipe,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.onFindSolicitudes();
  }

  onFindSolicitudes(){
    this.solicitudesService.getSolicitudes().subscribe(
      solicitudes => {
        this.solicitudes = solicitudes.filter( sol => sol.estatus === '2');
        console.log(this.solicitudes);
      }
    )
  }

}
