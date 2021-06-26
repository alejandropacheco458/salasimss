import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalaEdicionPage } from './sala-edicion.page';

const routes: Routes = [
  {
    path: '',
    component: SalaEdicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaEdicionPageRoutingModule {}
