import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarSalaPageRoutingModule } from './reservar-sala-routing.module';

import { ReservarSalaPage } from './reservar-sala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarSalaPageRoutingModule
  ],
  declarations: [ReservarSalaPage]
})
export class ReservarSalaPageModule {}
