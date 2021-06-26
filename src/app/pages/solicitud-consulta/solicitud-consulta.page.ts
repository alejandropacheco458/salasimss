import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Sala } from 'src/app/models/sala.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitud-consulta',
  templateUrl: './solicitud-consulta.page.html',
  styleUrls: ['./solicitud-consulta.page.scss'],
})
export class SolicitudConsultaPage implements OnInit {

  fecha: string;
  fechaValidate: Date;
  salaId: string;
  solicitudId: string;
  sol: any;

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

  horaInicio: any;
  horaTermino: any;

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

  sala: Sala = new Sala();

  usuarioId = null;

  constructor(
    private datePipe: DatePipe,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
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

}
