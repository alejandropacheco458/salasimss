import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudConsultaPageRoutingModule } from './solicitud-consulta-routing.module';

import { SolicitudConsultaPage } from './solicitud-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudConsultaPageRoutingModule
  ],
  declarations: [SolicitudConsultaPage]
})
export class SolicitudConsultaPageModule {}
