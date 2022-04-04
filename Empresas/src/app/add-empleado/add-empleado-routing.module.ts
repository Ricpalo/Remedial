import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmpleadoPage } from './add-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmpleadoPageRoutingModule {}
