import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudEdicionPage } from './solicitud-edicion.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudEdicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudEdicionPageRoutingModule {}
