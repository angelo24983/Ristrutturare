import { Tipologia } from './tipologia';
import { Iva } from './iva';
import { Fattura } from './fattura';

export class Preventivo {
  _id: string;
  nome: string;
  descrizione: string;
  importo: number;
  iva: Iva;
  importoIva: number;
  tipologia: Tipologia;
  fatture: Fattura[];
  coperto: boolean;
}