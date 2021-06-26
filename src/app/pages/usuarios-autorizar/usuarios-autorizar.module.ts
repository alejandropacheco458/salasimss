import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosAutorizarPageRoutingModule } from './usuarios-autorizar-routing.module';

import { UsuariosAutorizarPage } from './usuarios-autorizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosAutorizarPageRoutingModule
  ],
  declarations: [UsuariosAutorizarPage]
})
export class UsuariosAutorizarPageModule {}
