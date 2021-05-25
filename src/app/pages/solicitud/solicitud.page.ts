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
import { AngularFirestore } from '@angular/fire/firestore';
import { stringify } from '@angular/compiler/src/util';

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
    estatus: 1,
    proposito: '',
    materiales: ''
  };

  sala: Sala = new Sala();

  fecha: string;
  fechaValidate: string;
  salaId: string;
  solicitudId: string;
  sol: any;

  usuarioId = null;
  solicitudes: Solicitud[];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private nav: NavController,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private solicitudesServiceValidate: SalicitudService,
    private salaService: SalaService,
    public alertController: AlertController,
    public db: AngularFirestore
    )
    {

    }

  ngOnInit() {
    this.fecha = this.datePipe.transform(this.route.snapshot.params['fecha'], "yyyy-MM-dd");
    this.salaId = this.route.snapshot.params['salaId'];
    this.solicitudId = this.route.snapshot.params['solicitudId'];
    this.afAuth.authState.subscribe(user => {
      if (user){
        console.log("User ID: "+user.uid);
        this.usuarioId = user.uid;
        this.loadUsuario();
      }
      else{

      }
   });
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
    console.log("Hola: "+this.salaId);
    var result = this.db.collection('salas').ref.where('id','==',this.salaId);
    result.get().then((res) => {
      res.forEach( (doc) => {
        this.sala = doc.data() as Sala;
        console.log(this.sala.nombre);
        console.log(doc.id,' => ', doc.data());
        loading.dismiss();
        if(this.solicitudId != ''){
          this.loadSolicitudId();
        } else {
          this.loadSolicitud();
        }
      });
    });
  }

  loadSolicitudId() {
    console.log("Solicitud: "+this.solicitudId);
    var result = this.db.collection('solicitudes').ref.where('id','==',this.solicitudId);
    result.get().then((res) => {
      res.forEach( (doc) => {
        this.solicitud = doc.data() as Solicitud;
        this.fechaValidate = '2021-01-01T'+this.solicitud.inicio+':00.789';
        this.horaInicio = new Date(this.fechaValidate);
        this.fechaValidate = '2021-01-01T'+this.solicitud.termino+':00.789';
        this.horaTermino = new Date(this.fechaValidate);
        console.log(this.solicitud.proposito);
        console.log(doc.id,' => ', doc.data());
      });
    });
  }

  loadSolicitud() {
    console.log("solicitud: ");
    this.solicitud.fecha = this.fecha;
    console.log("Fechaaaaaaaaaaaaaaaaaaqwwwwwww: "+this.solicitud.fecha);
    this.solicitud.sala = this.salaId;
    this.solicitud.nombre = this.usuario.nombre+" "+this.usuario.apellido;
    this.solicitud.usuario = this.usuarioId;
    this.solicitud.espacio = this.sala.nombre;
    this.solicitud.estatus = 1;
  }

  validateSolicitud() {
    console.log("Validar horas i");
    this.solicitud.inicio = this.horaInicio.toString();
    this.solicitud.termino = this.horaTermino.toString();
    this.solicitud.fecha = this.fecha;
    console.log("Validar horas i: "+this.solicitud.inicio);
    console.log("Validar horas t: "+this.solicitud.termino);
    var horasInicio = this.db.collection('solicitudes').ref.where('fecha','==',this.solicitud.fecha)
                                                           .where('sala','==',this.solicitud.sala)
                                                           .where('estatus','==',1)
                                                           .where('inicio','>',this.solicitud.inicio)
                                                           .where('inicio','<',this.solicitud.termino);
    horasInicio.get().then((res) => {
      if (res.size  > 0) {
        res.forEach( (doc) => {
          const solicitud = doc.data() as Solicitud;
          console.log(solicitud.sala);
          console.log(doc.id,' => ', doc.data());
        });
        console.log("Las horas seleccionadas no estan disponibles, seleccionar otras! inicio: "+res.size);
        this.presentAlert();
      } else {
        this.validateSolicitudTimeTermino();
      }
    });

  }

  async validateSolicitudTimeTermino(){
    console.log("Validar horas t");
    var horasTermino = this.db.collection('solicitudes').ref.where('fecha','==',this.solicitud.fecha)
                                                            .where('sala','==',this.solicitud.sala)
                                                            .where('estatus','==',1)
                                                            .where('termino','>',this.solicitud.inicio)
                                                            .where('termino','<',this.solicitud.termino);
    horasTermino.get().then((res) => {
      if (res.size  > 0) {
        console.log("Las horas seleccionadas no estan disponibles, seleccionar otras! termino: "+res.size);
        this.presentAlert();
      } else {
        console.log(this.solicitud);
        this.saveSolicitud();
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Horas',
      subHeader: 'Horas Ocupadas',
      message: 'Las horas seleccionadas no estan disponibles, favor de seleccionar otras.',
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
    this.solicitudesServiceValidate.addSolicitud(this.solicitud).then((sol) => {
      loading.dismiss();
      console.log("Exito solicitud guardada");
      console.log("Solicitud guardar: "+sol.id);
      this.updateSolicitud(sol.id);
      this.nav.navigateForward('/reservar-sala');
    });
  }

  updateSolicitud(id: string) {
    this.solicitud.id = id;
    this.solicitudesServiceValidate.updateSolicitud(this.solicitud,id).then(() => {
      console.log("Exito solicitud actualizada");
      this.nav.navigateForward('/reservar-sala');
    });
  }

}
