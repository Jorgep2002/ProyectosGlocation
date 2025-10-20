export interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string; 
  fechaFin: string;
  estado: 'PAUSADO' | 'EN_PROGRESO' | 'FINALIZADO';
}