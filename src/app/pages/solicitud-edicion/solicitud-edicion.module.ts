import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudEdicionPageRoutingModule } from './solicitud-edicion-routing.module';

import { SolicitudEdicionPage } from './solicitud-edicion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudEdicionPageRoutingModule
  ],
  declarations: [SolicitudEdicionPage]
})
export class SolicitudEdicionPageModule {}
