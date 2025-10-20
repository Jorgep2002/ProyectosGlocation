import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../shared/models/project.model';
import { ProyectoService } from '../../shared/service/proyecto.service';
import { ToastService } from '../../../../core/services/toast.service';
@Component({
  selector: 'app-detail-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-edit.component.html',
  styleUrls: ['./detail-edit.component.scss'],
})
export class DetailEditComponent implements OnInit {
  project!: Project;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectoService,
    private toastService: ToastService 
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.proyectoService.obtenerProyectoPorId(+projectId).subscribe({
        next: (proj) => {
          this.project = {
            ...proj,
            fechaInicio: this.formatDateForInput(proj.fechaInicio),
            fechaFin: proj.fechaFin ? this.formatDateForInput(proj.fechaFin) : '',
          };
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = 'No se pudo cargar el proyecto';
          console.error(err);
          this.loading = false;
        },
      });
    } else {
      this.errorMsg = 'ID de proyecto no proporcionado';
      this.loading = false;
    }
  }


  private formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }


  onSave(form: NgForm) {
    if (!form.valid) return;

    this.proyectoService.actualizarProyecto(this.project.id, this.project).subscribe({
      next: (updated) => {
        this.toastService.show('Proyecto actualizado correctamente.', 'success');

        this.router.navigate(['/proyectos/listar']);
      },
      error: (err) => {
        console.error('Error al actualizar proyecto', err);
        this.errorMsg = 'Error al actualizar proyecto';
        this.toastService.show('Error al actualizar el proyecto.', 'error');
      },
    });
  }

  onCancel() {
    this.router.navigate(['/proyectos/listar']);
  }
}
