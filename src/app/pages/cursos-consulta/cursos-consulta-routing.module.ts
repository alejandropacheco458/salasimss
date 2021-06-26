import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { CursosConsultaPage } from './cursos-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: CursosConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
  PipesModule],
})
export class CursosConsultaPageRoutingModule {}
