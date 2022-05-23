import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'form-login',
    loadChildren: () => import('./form-login/form-login.module').then( m => m.FormLoginPageModule)
  },
  {
    path: 'form-registro',
    loadChildren: () => import('./form-registro/form-registro.module').then( m => m.FormRegistroPageModule)
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },
  {
    path: 'dashboard-usuario',
    loadChildren: () => import('./dashboard-usuario/dashboard-usuario.module').then( m => m.DashboardUsuarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
