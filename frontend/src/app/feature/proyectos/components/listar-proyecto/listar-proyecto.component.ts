import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Project } from '../../../../shared/models/project.model';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProyectoService } from '../../shared/service/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.scss'],
})
export class ListarProyectoComponent implements OnInit {
  projects: Project[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private proyectoService: ProyectoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Carga los proyectos desde el servicio
   */
  loadProjects(): void {
    this.loading = true;
    this.error = null;

    this.proyectoService.obtenerProyectos()
      .pipe(
        catchError(err => {
          console.error('Error al cargar proyectos', err);
          this.error = 'No se pudieron cargar los proyectos';
          return of([]);
        })
      )
      .subscribe(projects => {
        this.projects = projects;
        this.loading = false;
      });
  }

  deleteProject(id: number): void {
    if (!confirm('¿Está seguro de que desea eliminar este proyecto?')) return;

    this.proyectoService.eliminarProyecto(id)
      .pipe(
        catchError(err => {
          console.error('Error al eliminar proyecto', err);
          alert('Error al eliminar proyecto');
          return of(null);
        })
      )
      .subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== id);
      });
  }

  editProject(project: Project): void {
    this.router.navigate(['/proyectos', project.id]);
  }
}
