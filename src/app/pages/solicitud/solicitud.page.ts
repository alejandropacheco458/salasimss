import { SalicitudService } from './../../services/salicitud.service';
import { Sala } from './../../models/sala.model';
import { SalaService } from './../../services/sala.service';
import { Solicitud } from './../../models/solicitud.model';
import { UsuarioService } from './../../services/usuario.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Usuario } from './../../models/usuario.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

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

  horaInicio: Date = new Date();
  horaTermino: Date = new Date();

  solicitud: Solicitud= {
    id: '',
    nombre: '',
    usuario: '',
    espacio: '',
    sala: '',
    fecha: '',
    inicio: '',
    termino: '',
    estatus: 1
  };

  sala: Sala = new Sala();

  fecha: string;
  salaId: string;

  usuarioId = null;
  solicitudes: Solicitud[];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private nav: NavController,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private solicitudesService: SalicitudService,
    private salaService: SalaService,
    public alertController: AlertController
    )
    {

    }

  ngOnInit() {
    this.fecha = this.datePipe.transform(this.route.snapshot.params['fecha'], "yyyy-MM-dd");
    this.salaId = this.route.snapshot.params['salaId'];
    this.afAuth.authState.subscribe(user => {
      if (user){
        console.log("User ID: "+user.uid);
        this.usuarioId = user.uid;
        this.loadUsuario();
      }
      else{

      }
   })
    console.log(this.fecha);
    console.log(this.salaId);
  }

  async loadUsuario() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.usuarioService.getUsuario(this.usuarioId).subscribe( res => {
      loading.dismiss();
      this.usuario = res;
      console.log("usuario: "+this.usuario);
      this.loadSala();
    });
  }

  async loadSala() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.salaService.getSala(this.salaId).subscribe( res => {
      loading.dismiss();
      this.sala = res;
      console.log("sala: ");
      this.loadSolicitud();
    });
  }

  loadSolicitud() {
    console.log("solicitud: ");
    this.solicitud.fecha = this.fecha;
    this.solicitud.sala = this.salaId;
    this.solicitud.nombre = this.usuario.nombre+" "+this.usuario.apellido;
    this.solicitud.usuario = this.usuarioId;
    this.solicitud.espacio = this.sala.nombre;
    this.solicitud.estatus = 1;
  }

  async validateSolicitud(){

    console.log("Validar horas");
    this.solicitud.inicio = this.horaInicio.toString();
    this.solicitud.termino = this.horaTermino.toString();
    this.solicitudesService.getSolicitudesByFechaAndSalaAndTime(this.solicitud.fecha,
                                                                this.solicitud.sala,
                                                                this.solicitud.inicio,
                                                                this.solicitud.termino).subscribe(
      solicitudes => {
        console.log("Con horas");
        this.solicitudes = solicitudes;
        console.log(this.solicitudes.length);
        console.log(this.solicitudes);
        console.log("-------------------");
        if ( this.solicitudes.length === 0 ) {
          this.validateSolicitudTimeTermino();
        } else {
          console.log("Las horas seleccionadas no estan disponibles, seleccionar otras! inicio");
          this.presentAlert();
        }
      }
    )
  }

  async validateSolicitudTimeTermino(){

    console.log("Validar horas");
    this.solicitud.inicio = this.horaInicio.toString();
    this.solicitud.termino = this.horaTermino.toString();
    this.solicitudesService.getSolicitudesByFechaAndSalaAndTimeTermino(this.solicitud.fecha,
                                                                this.solicitud.sala,
                                                                this.solicitud.inicio,
                                                                this.solicitud.termino).subscribe(
      solicitudes => {
        console.log("Con horas");
        this.solicitudes = solicitudes;
        console.log(this.solicitudes.length);
        console.log(this.solicitudes);
        console.log("-------------------");
        if ( this.solicitudes.length === 0 ) {
          this.saveSolicitud();
        } else {
          console.log("Las horas seleccionadas no estan disponibles, seleccionar otras! termino");
          this.presentAlert();
        }
      }
    )
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Horas',
      subHeader: 'Horas Ocupadas',
      message: 'Las horas seleccionadas no estan disponibles, seleccionar otras.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async saveSolicitud() {
    console.log(this.horaTermino.toString());
    console.log(this.solicitud);
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();
    this.solicitudesService.addSolicitud(this.solicitud).then(() => {
      loading.dismiss();
      console.log("Exito solicitud guardada");
      this.nav.navigateForward('/reservar-sala');
    });
  }

}
