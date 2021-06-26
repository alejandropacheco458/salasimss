import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudConsultaPage } from './solicitud-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudConsultaPageRoutingModule {}
