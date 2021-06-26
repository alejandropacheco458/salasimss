import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudCancelarPage } from './solicitud-cancelar.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudCancelarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudCancelarPageRoutingModule {}
