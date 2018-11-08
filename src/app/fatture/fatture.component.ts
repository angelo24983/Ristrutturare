import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FattureDataSource } from './fatture-datasource';
import { FatturaService } from '../services/fattura.service';
import { AddFatturaDialogComponent } from './dialogs/add/add-fattura-dialog.component';
import { EditFatturaDialogComponent } from './dialogs/edit/edit-fattura-dialog.component';
import { DeleteFatturaDialogComponent } from './dialogs/delete/delete-fattura-dialog.component';
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
  displayedColumns = ['date', 'nome', 'descrizione', 'tipologia', 'emettitore', 'importo', 'numero', 'azioni'];
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

  startEdit(_id: number, nome: string, date: number, descrizione: string, emittitore: string, tipologia: string, importo: number, numero: number) {

    let data = {_id: _id, nome: nome, date: date, descrizione: descrizione, emittore: emittitore, tipologia: tipologia, importo: importo, numero: numero};
    const dialogRef = this.dialog.open(EditFatturaDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.fatturaService.updateFattura(data);
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(_id: string, nome: string, descrizione: string) {

    const dialogRef = this.dialog.open(DeleteFatturaDialogComponent, {
      data: {_id: _id, nome: nome, descrizione: descrizione}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.fatturaService.deleteFattura(_id);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
