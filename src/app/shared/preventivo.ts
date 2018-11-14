import { Tipologia } from './tipologia';

export class Preventivo {
  _id: string;
  nome: string;
  dataEmissione: number;
  descrizione: string;
  importo: number;
  emettitore: string;
  tipologia: Tipologia;
}