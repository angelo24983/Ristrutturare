import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FattureDataSource } from './fatture-datasource';
import { FatturaService } from '../services/fattura.service';
import { AddFatturaDialogComponent } from './dialogs/add/add-fattura-dialog.component';
import { Fattura } from '../shared/fattura';
import { pipe, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FattureDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'nome', 'descrizione', 'tipologia', 'emettitore', 'importo', 'numero'];
  subscription: Subscription;

  constructor(private fatturaService: FatturaService,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.subscription = this.fatturaService.getFatture().subscribe(d=>{
      console.log('data streaming');
      this.dataSource = new FattureDataSource(d, this.paginator, this.sort);   
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddFatturaDialogComponent, {
      data : { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        //this.fatturaService.postFattura dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
