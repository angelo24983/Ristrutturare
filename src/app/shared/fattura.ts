import { Tipologia } from './tipologia';

export class Fattura {
  _id: string;
  nome: string;
  dataEmissione: number;
  descrizione: string;
  importo: number;
  finanziata: boolean;
  numero: string;
  emettitore: string;
  tipologia: Tipologia;
  pagata: boolean;
  dataPagamento: number;
}