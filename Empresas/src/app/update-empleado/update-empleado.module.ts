import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEmpleadoPageRoutingModule } from './update-empleado-routing.module';

import { UpdateEmpleadoPage } from './update-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateEmpleadoPageRoutingModule
  ],
  declarations: [UpdateEmpleadoPage]
})
export class UpdateEmpleadoPageModule {}
