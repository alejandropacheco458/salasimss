import { Solicitud } from './../../models/solicitud.model';
import { SalicitudService } from './../../services/salicitud.service';
import { Sala } from './../../models/sala.model';
import { SalaService } from './../../services/sala.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservar-sala',
  templateUrl: './reservar-sala.page.html',
  styleUrls: ['./reservar-sala.page.scss'],
})
export class ReservarSalaPage implements OnInit {

  fecha: Date = new Date();
  fechaSolicitud: string;
  sala: Sala = new Sala();

  salas: Sala[];
  solicitudes: Solicitud[];

  constructor(
    private salaService: SalaService,
    private solicitudesService: SalicitudService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.salaService.getSalas().subscribe(
      salas => {
        this.salas = salas;
      }
    )
  }

  onFindSolicitudes(){
    this.fechaSolicitud=this.datePipe.transform(this.fecha, "yyyy-MM-dd");
    console.log(this.fechaSolicitud);
    console.log(this.sala.id);
    this.solicitudesService.getSolicitudesByFechaAndSala(this.fechaSolicitud,this.sala.id).subscribe(
      solicitudes => {
        this.solicitudes = solicitudes;
        console.log(this.solicitudes);
      }
    )
  }

}
