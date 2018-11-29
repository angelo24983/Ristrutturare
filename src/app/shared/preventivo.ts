import { Tipologia } from './tipologia';
import { Iva } from './iva';

export class Preventivo {
  _id: string;
  nome: string;
  dataEmissione: number;
  descrizione: string;
  importo: number;
  iva: Iva;
  importoIva: number;
  emettitore: string;
  tipologia: Tipologia;
}