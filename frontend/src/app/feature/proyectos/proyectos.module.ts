import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProyectoComponent } from './components/listar-proyecto/listar-proyecto.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { DetailEditComponent } from './components/detallar-editar-proyecto/detail-edit.component';
import { GraficarProyectosComponent } from './components/graficar-proyectos/graficar-proyectos.component';
import { AnalizarProyectoComponent } from './components/analizar-proyecto/analizar-proyecto.component';

const routes: Routes = [
  { path: 'listar', component: ListarProyectoComponent },
  { path: 'crear', component: CrearProyectoComponent },
  { path: 'graficos', component: GraficarProyectosComponent }, 
  { path: 'analisis', component: AnalizarProyectoComponent }, 
  { path: ':id', component: DetailEditComponent },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosModule {}
