import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
      loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
      canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'form-usuario',
    loadChildren: () => import('./form-usuario/form-usuario.module').then( m => m.FormUsuarioPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'add-empleado',
    loadChildren: () => import('./add-empleado/add-empleado.module').then( m => m.AddEmpleadoPageModule)
  },
  {
    path: 'update-empleado',
    loadChildren: () => import('./update-empleado/update-empleado.module').then( m => m.UpdateEmpleadoPageModule)
  },
  {
    path: 'add-asistencia',
    loadChildren: () => import('./add-asistencia/add-asistencia.module').then( m => m.AddAsistenciaPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
