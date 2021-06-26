import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {

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

  async saveCurso() {
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    });
    await loading.present();

    if (this.cursoId != '') {
      //
      this.cursoService.updateCurso(this.curso, this.cursoId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/cursos');
      })
    } else {
      this.cursoService.addCurso(this.curso).then((curso) => {
      loading.dismiss();
      this.updateCurso(curso.id);
      })
    }
  }

  updateCurso(id: string) {
    this.curso.id = id;
    this.cursoService.updateCurso(this.curso,id).then(() => {
      console.log("Exito curso actualizado");
      this.nav.navigateForward('/cursos');
    });
  }

}
