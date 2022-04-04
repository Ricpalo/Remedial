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
    path: 'ubicaciones',
    loadChildren: () => import('./ubicaciones/ubicaciones.module').then( m => m.UbicacionesPageModule)
  },
  {
    path: 'instructores',
    loadChildren: () => import('./instructores/instructores.module').then( m => m.InstructoresPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'add-ubicacion',
    loadChildren: () => import('./add-ubicacion/add-ubicacion.module').then( m => m.AddUbicacionPageModule)
  },
  {
    path: 'update-ubicacion',
    loadChildren: () => import('./update-ubicacion/update-ubicacion.module').then( m => m.UpdateUbicacionPageModule)
  },
  {
    path: 'add-alumno',
    loadChildren: () => import('./add-alumno/add-alumno.module').then( m => m.AddAlumnoPageModule)
  },
  {
    path: 'update-alumno',
    loadChildren: () => import('./update-alumno/update-alumno.module').then( m => m.UpdateAlumnoPageModule)
  },
  {
    path: 'add-instructor',
    loadChildren: () => import('./add-instructor/add-instructor.module').then( m => m.AddInstructorPageModule)
  },
  {
    path: 'update-instructor',
    loadChildren: () => import('./update-instructor/update-instructor.module').then( m => m.UpdateInstructorPageModule)
  },
  {
    path: 'add-curso',
    loadChildren: () => import('./add-curso/add-curso.module').then( m => m.AddCursoPageModule)
  },
  {
    path: 'update-curso',
    loadChildren: () => import('./update-curso/update-curso.module').then( m => m.UpdateCursoPageModule)
  },
  {
    path: 'add-evento',
    loadChildren: () => import('./add-evento/add-evento.module').then( m => m.AddEventoPageModule)
  },
  {
    path: 'update-evento',
    loadChildren: () => import('./update-evento/update-evento.module').then( m => m.UpdateEventoPageModule)
  },  {
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
