import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalaEdicionPageRoutingModule } from './sala-edicion-routing.module';

import { SalaEdicionPage } from './sala-edicion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaEdicionPageRoutingModule
  ],
  declarations: [SalaEdicionPage]
})
export class SalaEdicionPageModule {}
