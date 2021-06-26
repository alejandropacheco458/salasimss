import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso-consulta',
  templateUrl: './curso-consulta.page.html',
  styleUrls: ['./curso-consulta.page.scss'],
})
export class CursoConsultaPage implements OnInit {

  cursoId = null;

  curso: curso = {
    id: '',
    nombre: '',
    descripcion: '',
    liga: ''
  }

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private loadingController: LoadingController,
    private cursoService: CursoService
  ) { }

  ngOnInit() {
    this.cursoId = this.route.snapshot.params['id'];
    if (this.cursoId != '') {
      this.loadCurso();
    }
  }

  async loadCurso() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.cursoService.getCurso(this.cursoId).subscribe( res => {
      loading.dismiss();
      this.curso = res;
    });
  }

}
