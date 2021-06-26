import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesUsuarioPageRoutingModule } from './solicitudes-usuario-routing.module';

import { SolicitudesUsuarioPage } from './solicitudes-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesUsuarioPageRoutingModule
  ],
  declarations: [SolicitudesUsuarioPage]
})
export class SolicitudesUsuarioPageModule {}
