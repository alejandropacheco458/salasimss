import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Sala } from 'src/app/models/sala.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { Usuario } from 'src/app/models/usuario.model';
import { SalaService } from 'src/app/services/sala.service';
import { SalicitudService } from 'src/app/services/salicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitud-cancelar',
  templateUrl: './solicitud-cancelar.page.html',
  styleUrls: ['./solicitud-cancelar.page.scss'],
})
export class SolicitudCancelarPage implements OnInit {

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

  horaInicio: any;
  horaTermino: any;

  solicitud: Solicitud = {
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

  sala: Sala = new Sala();

  fecha: string;
  fechaValidate: Date;
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
  ) { }

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
          this.loadSolicitud();
        } else {
          ////this.loadSolicitud();
        }
      });
    });
  }

  loadSolicitud() {
    console.log("Solicitud: "+this.solicitudId);
    var result = this.db.collection('solicitudes').ref.where('id','==',this.solicitudId);
    result.get().then((res) => {
      res.forEach( (doc) => {
        this.solicitud = doc.data() as Solicitud;
        this.fechaValidate = new Date('2021-01-01T'+this.solicitud.inicio+':00.789');
        this.horaInicio = this.fechaValidate.toISOString();
        this.fechaValidate = new Date('2021-01-01T'+this.solicitud.termino+':00.789');
        this.horaTermino = this.fechaValidate.toISOString();
        console.log(this.solicitud.proposito);
        console.log(doc.id,' => ', doc.data());
      });
    });
  }



  updateSolicitud() {
    this.presentAlertConfirm();
  }

  updateSolicitudCancelar() {
    this.solicitud.estatus = '4';
    console.log(this.solicitud);
    this.solicitudesServiceValidate.updateSolicitud(this.solicitud,this.solicitud.id).then(() => {
      console.log("Exito solicitud actualizada");
      this.presentAlertSolicitudCancelacion();
      if (this.usuario.rol === 1) {
        this.nav.navigateForward('/home');
      } else {
        this.nav.navigateForward('/home-usuario');
      }
      
    });
  }

  async presentAlertSolicitudCancelacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Solicitud cancelada',
      subHeader: '',
      message: 'Se ha cancelado la solicitud.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación!',
      message: '¿Esta seguro de cancelar la solicitud?',
      buttons: [
        {
          text: 'No',
          handler: (blah) => {
            console.log('Confirm Cancel: No');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm Okay');
            this.updateSolicitudCancelar();
          }
        }
      ]
    });

    await alert.present();
  }

}
