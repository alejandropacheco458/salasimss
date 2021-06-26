import { Solicitud } from './../../models/solicitud.model';
import { SalicitudService } from './../../services/salicitud.service';
import { Sala } from './../../models/sala.model';
import { SalaService } from './../../services/sala.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { exit } from 'process';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-reservar-sala',
  templateUrl: './reservar-sala.page.html',
  styleUrls: ['./reservar-sala.page.scss'],
})
export class ReservarSalaPage implements OnInit {

  fecha: Date = new Date();
  fechaSolicitud: string;
  sala: Sala = new Sala();
  usuarioId = null;

  salas: Sala[];
  solicitudes: Solicitud[] = [];
  solicitudesBack: Solicitud[] = [];
  fechaInicio: Date;
  fechaTermino: Date;
  solicitud: Solicitud= {
    id: '',
    nombre: '',
    usuario: '',
    espacio: '',
    sala: '',
    fecha: '',
    inicio: '',
    termino: '',
    estatus: '1',
    proposito: '',
    materiales: '',
    observaciones: ''
  };
  fechaValidate: string;

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
    private salaService: SalaService,
    private solicitudesService: SalicitudService,
    private datePipe: DatePipe,
    private nav: NavController,
    private router: Router,
    private usuarioService: UsuarioService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.salaService.getSalas().subscribe(
      salas => {
        this.salas = salas.filter( sala => sala.estatus === '1');
      }
    );
    this.afAuth.authState.subscribe(user => {
      if (user){
        console.log("User ID: "+user.uid);
        this.usuarioId = user.uid;
        this.loadUsuario();
      }
      else{

      }
   });
   console.log("ONINIT");
   console.log(this.sala.id);
   if (this.sala.id != undefined) {
     this.onFindSolicitudes();
   }
  }

  loadUsuario() {
    console.log("hola");
    this.usuarioService.getUsuario(this.usuarioId).subscribe( res => {
      this.usuario = res;
      console.log("usuario: "+this.usuario);
    });
  }

  onChangeFechaSala() {
    if (this.sala.id != undefined) {
      this.onFindSolicitudes();
    }
  }

  onValidarUsuario(estatus: string,usuario: string, solicitud: string, inicio: string, termino: string) {
    console.log(this.fecha.toString());
    console.log(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    console.log(this.fecha.toString() <= this.datePipe.transform(new Date(), 'yyyy-MM-dd') ? true : false);
    if(this.fecha.toString() >= this.datePipe.transform(new Date(), 'yyyy-MM-dd')&& (estatus==='1' || estatus==='2')) {
      if (solicitud === '') {
        this.router.navigate(['/solicitud', this.fecha, this.sala.id, '',inicio,termino]);
      } else {
        if (usuario === this.usuarioId || this.usuario.rol === 1 ) {
          this.router.navigate(['/solicitud-cancelar', this.fecha, this.sala.id, solicitud]);
        }
      } 
    } else {
      this.router.navigate(['/solicitud-consulta', this.fecha, this.sala.id, solicitud]);
    }      
  }

  onFindSolicitudes(){
    this.fechaSolicitud=this.datePipe.transform(this.fecha, "yyyy-MM-dd");
    console.log(this.fechaSolicitud);
    console.log(this.sala.id);
    var ini = false;
    var ter = false;
    var add = false;
    this.solicitudes = [];

    

    this.fechaInicio = new Date('2021-01-01T'+this.sala.inicio+':00.789');
    this.fechaTermino = new Date('2021-01-01T'+this.sala.termino+':00.789');

    this.solicitudesService.getSolicitudesByFechaAndSala(this.fechaSolicitud,this.sala.id).subscribe(
      solicitudes => {
        this.solicitudesBack = solicitudes.filter( sol => sol.estatus === '1');

        do {      
          var minutos = this.fechaInicio.getMinutes();
          
          var solicitud: Solicitud= {
            id: '',
            nombre: '',
            usuario: '',
            espacio: '',
            sala: '',
            fecha: '',
            inicio: '',
            termino: '',
            estatus: '1',
            proposito: '',
            materiales: '',
            observaciones: ''
          };
          var min = new Date(this.fechaInicio.toString()).getMinutes() === 0 ? '00' : new Date(this.fechaInicio.toString()).getMinutes().toString();
          solicitud.inicio = new Date(this.fechaInicio.toString()).getHours()+':'+min;
          this.fechaInicio.setMinutes(minutos + 30);
          min = new Date(this.fechaInicio.toString()).getMinutes() === 0 ? '00' : new Date(this.fechaInicio.toString()).getMinutes().toString();
          solicitud.termino = new Date(this.fechaInicio.toString()).getHours()+':'+min;
          solicitud.proposito = 'Disponible';  
          
          console.log(solicitud);

          this.solicitudesBack.forEach( sol => {
            console.log("11s");
            console.log(sol);
            if (solicitud.inicio === sol.inicio) {
              ini = true;
            }
            if (solicitud.termino === sol.termino) {
              ter = true;
            }
            if (ini && ter) {
              this.solicitudes.push(sol);
              ini = false;
              ter = false;
              add = true;
              return;
            }
          } );
          if (!ini && !ter && !add) {
            this.solicitudes.push(solicitud);          
          } else {
            add = false;
          }

        } while (this.fechaInicio < this.fechaTermino)
        console.log(this.solicitudes);
      }
    )
  }

}
