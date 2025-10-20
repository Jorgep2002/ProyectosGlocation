export interface AISummaryService {
  resumir(descripciones: string[]): Promise<string>;
}
