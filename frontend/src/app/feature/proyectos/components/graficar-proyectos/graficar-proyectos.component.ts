// graficar-proyectos.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ProyectoPorEstado, ProyectoService } from '../../shared/service/proyecto.service';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-graficar-proyectos',
  templateUrl: './graficar-proyectos.component.html',
  styleUrls: ['./graficar-proyectos.component.scss']
})
export class GraficarProyectosComponent implements OnInit {
  @ViewChild('miGrafico', { static: true }) miGrafico!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.proyectoService.obtenerCantidadProyectosPorEstado().subscribe({
      next: (data: ProyectoPorEstado[]) => this.crearGrafico(data),
      error: (err) => console.error('Error al obtener datos de gráficos', err)
    });
  }

  crearGrafico(data: ProyectoPorEstado[]) {
    const estados = data.map(d => d.estado);
    const cantidades = data.map(d => d.cantidad);

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: estados,
        datasets: [{
          label: 'Cantidad de proyectos por estado',
          data: cantidades,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: { enabled: true },
          datalabels: {
            color: '#fff',
            font: { weight: 'bold', size: 14 },
            formatter: (value, ctx) => {
              const total = ctx.chart.data.datasets[0].data.reduce((a: number, b: any) => a + b, 0);
              const porcentaje = ((value as number / total) * 100).toFixed(1) + '%';
              return porcentaje;
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    };

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.miGrafico.nativeElement, config);
  }
}
