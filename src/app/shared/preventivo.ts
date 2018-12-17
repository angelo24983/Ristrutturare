import { Tipologia } from './tipologia';
import { Iva } from './iva';

export class Preventivo {
  _id: string;
  nome: string;
  descrizione: string;
  importo: number;
  iva: Iva;
  importoIva: number;
  tipologia: Tipologia;
}