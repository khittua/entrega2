import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WardGuard } from './ward.guard'; // Importa tu AuthGuard


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    children: [
      {
        path: '', // Ruta por defecto de Login (puede mostrar el formulario de inicio de sesión)
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'recover', // Ruta para la recuperación de contraseña
        loadChildren: () => import('./pages/recover/recover.module').then((m) => m.RecoverPageModule),
      },
      {
        path: 'home', // Ruta para la página de inicio
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule),
    canActivate: [WardGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'clase',
    loadChildren: () => import('./pages/clase/clase.module').then( m => m.ClasePageModule),
    canActivate: [WardGuard]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'selfie',
    loadChildren: () => import('./pages/selfie/selfie.module').then( m => m.SelfiePageModule),
    canActivate: [WardGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
