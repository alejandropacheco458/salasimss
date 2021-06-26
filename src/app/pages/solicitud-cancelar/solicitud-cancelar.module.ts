import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudCancelarPageRoutingModule } from './solicitud-cancelar-routing.module';

import { SolicitudCancelarPage } from './solicitud-cancelar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudCancelarPageRoutingModule
  ],
  declarations: [SolicitudCancelarPage]
})
export class SolicitudCancelarPageModule {}
