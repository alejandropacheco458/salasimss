import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservarSalaPage } from './reservar-sala.page';

const routes: Routes = [
  {
    path: '',
    component: ReservarSalaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarSalaPageRoutingModule {}
