import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'proyectos', pathMatch: 'full' },
  {
    path: 'proyectos',
    loadChildren: () =>
      import('./feature/proyectos/proyectos.module').then(m => m.ProyectosModule),
  },
  { path: '**', redirectTo: 'proyectos' }, 
];
