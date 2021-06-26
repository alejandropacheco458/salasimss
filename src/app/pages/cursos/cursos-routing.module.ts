import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { CursosPage } from './cursos.page';

const routes: Routes = [
  {
    path: '',
    component: CursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
  PipesModule],
})
export class CursosPageRoutingModule {}
