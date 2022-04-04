import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAsistenciaPage } from './add-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: AddAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAsistenciaPageRoutingModule {}
