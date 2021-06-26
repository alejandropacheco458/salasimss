import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/:id/:vista',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-usuario',
    loadChildren: () => import('./pages/home-usuario/home-usuario.module').then( m => m.HomeUsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservar-sala',
    loadChildren: () => import('./pages/reservar-sala/reservar-sala.module').then( m => m.ReservarSalaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitud/:fecha/:salaId/:solicitudId/:inicio/:termino',
    loadChildren: () => import('./pages/solicitud/solicitud.module').then( m => m.SolicitudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'salas',
    loadChildren: () => import('./pages/salas/salas.module').then( m => m.SalasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sala/:id',
    loadChildren: () => import('./pages/sala/sala.module').then( m => m.SalaPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'curso/:id',
    loadChildren: () => import('./pages/curso/curso.module').then( m => m.CursoPageModule)
  },
  {
    path: 'solicitud-edicion/:fecha/:salaId/:solicitudId',
    loadChildren: () => import('./pages/solicitud-edicion/solicitud-edicion.module').then( m => m.SolicitudEdicionPageModule)
  },
  {
    path: 'solicitud-cancelar/:fecha/:salaId/:solicitudId',
    loadChildren: () => import('./pages/solicitud-cancelar/solicitud-cancelar.module').then( m => m.SolicitudCancelarPageModule)
  },
  {
    path: 'solicitudes-autorizar',
    loadChildren: () => import('./pages/solicitudes-autorizar/solicitudes-autorizar.module').then( m => m.SolicitudesAutorizarPageModule)
  },
  {
    path: 'cursos-consulta',
    loadChildren: () => import('./pages/cursos-consulta/cursos-consulta.module').then( m => m.CursosConsultaPageModule)
  },
  {
    path: 'curso-consulta/:id',
    loadChildren: () => import('./pages/curso-consulta/curso-consulta.module').then( m => m.CursoConsultaPageModule)
  },
  {
    path: 'register-complete',
    loadChildren: () => import('./pages/register-complete/register-complete.module').then( m => m.RegisterCompletePageModule)
  },
  {
    path: 'usuarios-autorizar',
    loadChildren: () => import('./pages/usuarios-autorizar/usuarios-autorizar.module').then( m => m.UsuariosAutorizarPageModule)
  },
  {
    path: 'sala-edicion/:id',
    loadChildren: () => import('./pages/sala-edicion/sala-edicion.module').then( m => m.SalaEdicionPageModule)
  },
  {
    path: 'solicitudes-usuario',
    loadChildren: () => import('./pages/solicitudes-usuario/solicitudes-usuario.module').then( m => m.SolicitudesUsuarioPageModule)
  },
  {
    path: 'solicitud-consulta/:fecha/:salaId/:solicitudId',
    loadChildren: () => import('./pages/solicitud-consulta/solicitud-consulta.module').then( m => m.SolicitudConsultaPageModule)
  }










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
