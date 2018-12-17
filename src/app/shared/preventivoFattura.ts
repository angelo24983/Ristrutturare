import { Preventivo } from './preventivo';
import { Fattura } from './fattura';

export class PreventivoFattura {
    _id: string;
    preventivo: Preventivo;
    fatture: Fattura[];
}

export interface PreventivoFatturaDB {
    preventivoId: string;
    fatturaId: string;
};