import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { pipe, Subscription } from 'rxjs';

import { RiepilogoDataSource } from './riepilogo-datasource';
import { PreventivoService } from '../services/preventivo.service';
import { FatturaService } from '../services/fattura.service';
import { Preventivo } from '../shared/preventivo';
import { Fattura } from '../shared/fattura';
import { Riepilogo } from '../shared/riepilogo';

@Component({
  selector: 'riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RiepilogoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tipologia', 'numero', 'totale', 'importoPagato', 'importoFinanziato', 'pagato'];
  subscription : Subscription

  constructor(private preventivoService: PreventivoService,
              private fatturaService: FatturaService) {
  }

  ngOnInit() {

    let riepilogo = new Array<Riepilogo>();
    let preventivi = new Array<Preventivo>();
    let fatture = new Array<Fattura>();

    let riepilogoPreventivi = new Riepilogo();
    riepilogoPreventivi.tipologia = 'Preventivo';
    riepilogoPreventivi.numero = 0;
    riepilogoPreventivi.totale = 0;

    let riepilogoFatture = new Riepilogo();
    riepilogoFatture.tipologia = 'Fattura';
    riepilogoFatture.numero = 0;
    riepilogoFatture.totale = 0;
    riepilogoFatture.importoPagato = 0;
    riepilogoFatture.importoFinanziato = 0;
    riepilogoFatture.pagato = false;

    this.subscription = this.preventivoService.getPreventivi().subscribe(data=>{
      data.forEach(preventivo => {
        riepilogoPreventivi.numero++;
        riepilogoPreventivi.totale+=preventivo.importoIva;
      });

      this.subscription = this.fatturaService.getFatture().subscribe(data=>{
        data.forEach(fattura => {
          riepilogoFatture.numero++;
          riepilogoFatture.totale+=fattura.importo;
          if(fattura.pagata){
            if(fattura.finanziata){
              riepilogoFatture.importoFinanziato+=fattura.importo;
            }else{
              riepilogoFatture.importoPagato+=fattura.importo;
            }
          }
        });

        if((riepilogoFatture.importoPagato + riepilogoFatture.importoFinanziato) === riepilogoFatture.totale){
          riepilogoFatture.pagato = true;
        }
        
        riepilogo.push(riepilogoPreventivi);
        riepilogo.push(riepilogoFatture);

        this.dataSource = new RiepilogoDataSource(riepilogo, this.paginator, this.sort);   
      });  
    });
  }

  ngOnDestroy(): void {
    if(this.subscription && !this.subscription.closed){
      this.subscription.unsubscribe();
    }
  }

  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
