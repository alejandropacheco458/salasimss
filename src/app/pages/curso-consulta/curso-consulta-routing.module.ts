import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoConsultaPage } from './curso-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: CursoConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoConsultaPageRoutingModule {}
