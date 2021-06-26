import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesAutorizarPageRoutingModule } from './solicitudes-autorizar-routing.module';

import { SolicitudesAutorizarPage } from './solicitudes-autorizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesAutorizarPageRoutingModule
  ],
  declarations: [SolicitudesAutorizarPage]
})
export class SolicitudesAutorizarPageModule {}
