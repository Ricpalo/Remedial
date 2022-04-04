import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAsistenciaPageRoutingModule } from './add-asistencia-routing.module';

import { AddAsistenciaPage } from './add-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAsistenciaPageRoutingModule
  ],
  declarations: [AddAsistenciaPage]
})
export class AddAsistenciaPageModule {}
