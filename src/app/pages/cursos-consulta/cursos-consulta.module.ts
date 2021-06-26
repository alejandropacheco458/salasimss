import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosConsultaPageRoutingModule } from './cursos-consulta-routing.module';

import { CursosConsultaPage } from './cursos-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosConsultaPageRoutingModule
  ],
  declarations: [CursosConsultaPage]
})
export class CursosConsultaPageModule {}
