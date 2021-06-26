import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {

  salaId = null;

  horaInicio: Date = new Date();
  horaTermino: Date = new Date();

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
    });
  }

  async saveSala() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    if (this.salaId != '') {
      //
      this.salaService.updateSala(this.sala, this.salaId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/salas');
      })
    } else {
      this.sala.inicio = this.horaInicio.toString();
      this.sala.termino = this.horaTermino.toString();
      this.salaService.addSala(this.sala).then((sala) => {
      loading.dismiss();
      this.updateSala(sala.id);
      })
    }
  }

  updateSala(id: string) {
    this.sala.id = id;
    this.salaService.updateSala(this.sala,id).then(() => {
      console.log("Exito sala actualizada");
      this.nav.navigateForward('/salas');
    });
  }

}
