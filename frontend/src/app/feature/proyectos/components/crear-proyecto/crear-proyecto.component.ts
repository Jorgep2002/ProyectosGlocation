import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Project } from '../../../../shared/models/project.model';
import { ProyectoService } from '../../shared/service/proyecto.service';
import { ToastService } from '../../../../core/services/toast.service'; // 👈 ajusta la ruta según tu estructura

@Component({
  selector: 'app-crear-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss'],
})
export class CrearProyectoComponent {
  project: Project = {
    id: 0,
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'PAUSADO'
  };
  isEditing: boolean = false;

  constructor(
    private proyectoService: ProyectoService,
    private toastService: ToastService // 
  ) {}

  submitProject(form: NgForm) {
    if (!form.valid) return;

    if (this.isEditing) {
      this.proyectoService.actualizarProyecto(this.project.id, this.project).subscribe({
        next: (updated) => {
          this.toastService.show('Proyecto actualizado correctamente.', 'success');
          this.resetForm(form);
        },
        error: (err) => console.error('Error al actualizar proyecto', err),
      });
    } else {
      this.proyectoService.crearProyecto(this.project).subscribe({
        next: (created) => {
          this.toastService.show('Proyecto creado correctamente.', 'success'); 
          this.resetForm(form);
        },
        error: (err) => console.error('Error al crear proyecto', err),
      });
    }
  }

  cancelEdit(form?: NgForm) {
    this.resetForm(form);
  }

  private resetForm(form?: NgForm) {
    this.project = {
      id: 0,
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      estado: 'PAUSADO'
    };
    this.isEditing = false;

    if (form) {
      form.resetForm(this.project);
    }
  }
}
