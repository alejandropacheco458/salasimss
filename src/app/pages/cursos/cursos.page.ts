import { Component, OnInit } from '@angular/core';
import { curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  texto = '';

  cursos: curso[];

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.cursoService.getCursos().subscribe(
      cursos => {
        this.cursos = cursos;
      }
    )
  }

  buscar( event ){
    this.texto = event.detail.value;
  }

}
