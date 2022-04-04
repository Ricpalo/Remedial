import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateEmpleadoPage } from './update-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateEmpleadoPageRoutingModule {}
