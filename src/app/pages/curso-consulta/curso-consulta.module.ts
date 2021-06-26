import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoConsultaPageRoutingModule } from './curso-consulta-routing.module';

import { CursoConsultaPage } from './curso-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoConsultaPageRoutingModule
  ],
  declarations: [CursoConsultaPage]
})
export class CursoConsultaPageModule {}
