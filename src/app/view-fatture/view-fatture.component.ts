import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewFattureDataSource } from './view-fatture-datasource';
import { FatturaService } from '../services/fattura.service';
import { Fattura } from '../shared/fattura';
import { pipe, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-view-fatture',
  templateUrl: './view-fatture.component.html',
  styleUrls: ['./view-fatture.component.scss']
})
export class ViewFattureComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewFattureDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'nome', 'descrizione', 'tipologia', 'emettitore', 'importo', 'numero'];
  subscription: Subscription;

  constructor(private fatturaService: FatturaService) {

  }

  ngOnInit() {
    this.subscription = this.fatturaService.getFatture().subscribe(d=>{
      console.log('data streaming');
      this.dataSource = new ViewFattureDataSource(d, this.paginator, this.sort);   
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
