import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appTitle = 'Gestión de Proyectos';
  navLinks = [
    { path: '/proyectos', label: 'Listar Proyectos' },
    { path: '/proyectos/crear', label: 'Crear Proyecto' },
    { path: '/proyectos/graficos', label: 'Dashboard' },
    { path: '/proyectos/analisis', label: 'Analisis' },
  ];
}
