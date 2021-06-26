import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosAutorizarPage } from './usuarios-autorizar.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosAutorizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosAutorizarPageRoutingModule {}
