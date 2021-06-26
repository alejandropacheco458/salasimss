import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesAutorizarPage } from './solicitudes-autorizar.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesAutorizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesAutorizarPageRoutingModule {}
