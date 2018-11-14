import { Tipologia } from './tipologia';

export class Preventivo {
  _id: string;
  nome: string;
  dataEmissione: number;
  descrizione: string;
  importo: number;
  iva: number;
  importoIva: number;
  emettitore: string;
  tipologia: Tipologia;
}