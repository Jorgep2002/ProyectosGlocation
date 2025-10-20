import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoService } from '../../shared/service/proyecto.service';

@Component({
  selector: 'app-analizar-proyecto',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './analizar-proyecto.component.html',
  styleUrls: ['./analizar-proyecto.component.scss']
})
export class AnalizarProyectoComponent implements OnInit {
  resumen: string | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen() {
    this.loading = true;
    this.error = null;

    this.proyectoService.analizarProyectos().subscribe({
      next: (data) => {
        this.resumen = data.resumen;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al analizar proyectos', err);
        this.error = 'No se pudo obtener el resumen de proyectos.';
        this.loading = false;
      }
    });
  }
}
