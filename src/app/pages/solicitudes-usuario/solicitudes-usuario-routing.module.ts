import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesUsuarioPage } from './solicitudes-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesUsuarioPageRoutingModule {}
