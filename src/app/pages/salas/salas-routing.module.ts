import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { SalasPage } from './salas.page';

const routes: Routes = [
  {
    path: '',
    component: SalasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
  PipesModule],
})
export class SalasPageRoutingModule {}
