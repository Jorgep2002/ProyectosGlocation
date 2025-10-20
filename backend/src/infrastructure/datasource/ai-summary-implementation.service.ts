import { AISummaryService } from '../../domain/services/ai-summary.service';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { CustomError } from '../../domain/errors/custom.error';
import { LoggerService } from '../../config/plugis/logger';

export class GoogleAISummaryService implements AISummaryService {
  private model: GenerativeModel;
  private logger = new LoggerService();

  constructor(apiKey: string) {
    const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);

    this.model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: 'Eres un asistente experto en análisis y resumen. Genera un resumen único, claro y conciso de los siguientes proyectos. Utiliza un tono profesional y enfocado en los resultados.',
    });
  }

  async resumir(descripciones: string[]): Promise<string> {
    const prompt = descripciones.join('\n\n---\n\n');

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      this.logger.error('Error al generar el resumen con Google AI:', error);

      throw CustomError.internalServer(
        'Fallo en el servicio de resumen por IA. Contacta al administrador del sistema.'
      );
    }
  }
}
