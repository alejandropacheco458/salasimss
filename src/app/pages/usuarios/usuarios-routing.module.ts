import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { UsuariosPage } from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
  PipesModule],
})
export class UsuariosPageRoutingModule {}
