import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-sala-edicion',
  templateUrl: './sala-edicion.page.html',
  styleUrls: ['./sala-edicion.page.scss'],
})
export class SalaEdicionPage implements OnInit {

  salaId = null;

  horaInicio: any;
  horaTermino: any;

  hInicio: string;
  hTermino: string;

  fechaValidate: Date;

  sala: Sala = {
    id: '',
    nombre: '',
    capacidad: '',
    inicio: '',
    termino: '',
    estatus: '1',
    autorizacion: '1'
  }

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private loadingController: LoadingController,
    private salaService: SalaService
  ) { }

  ngOnInit() {
    this.salaId = this.route.snapshot.params['id'];
    if (this.salaId != '') {
      this.loadSala();
    }
  }

  async loadSala() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.salaService.getSala(this.salaId).subscribe( res => {
      loading.dismiss();
      this.sala = res;
      this.fechaValidate = new Date('2021-01-01T'+this.sala.inicio+':00.789');
      this.horaInicio = this.fechaValidate.toISOString();
      this.fechaValidate = new Date('2021-01-01T'+this.sala.termino+':00.789');
      this.horaTermino = this.fechaValidate.toISOString();
    });
  }

  async saveSala() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    if (this.salaId != '') {
      //
      this.hInicio = new Date(this.horaInicio.toString()).getHours()+':00';
      this.sala.inicio = this.hInicio.length === 5 ? this.hInicio : '0'+this.hInicio;
      this.hTermino = new Date(this.horaTermino.toString()).getHours()+':00';
      this.sala.termino = this.hTermino.length === 5 ? this.hTermino : '0'+this.hTermino;
      console.log(this.sala);
      this.salaService.updateSala(this.sala, this.salaId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/salas');
      })
    }
  }

}
