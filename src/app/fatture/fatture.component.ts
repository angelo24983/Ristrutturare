import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FattureDataSource } from './fatture-datasource';
import { FatturaService } from '../services/fattura.service';
import { AddFatturaDialogComponent } from './dialogs/add/add-fattura-dialog.component';
import { EditFatturaDialogComponent } from './dialogs/edit/edit-fattura-dialog.component';
import { DeleteFatturaDialogComponent } from './dialogs/delete/delete-fattura-dialog.component';
import { DetailsFatturaDialogComponent } from './dialogs/details/details-fattura-dialog.component';
import { PagaFatturaDialogComponent } from './dialogs/paga/paga-fattura-dialog.component';
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
  displayedColumns = ['select', 'dataEmissione', 'nome', 'tipologia', 'emettitore', 'importo', 'pagata', 'azioni'];
  subscription: Subscription;
  selection = new SelectionModel<Fattura>(true, []);
  totale = 0;

  constructor(private fatturaService: FatturaService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.fatturaService.getFatture().subscribe(fatture=>{
      this.dataSource = new FattureDataSource(fatture, this.paginator, this.sort);   
    });  
  }

  ngOnDestroy(): void {
    if(this.subscription && !this.subscription.closed){
      this.subscription.unsubscribe();
    }
  }

  addFattura() {
    const dialogRef = this.dialog.open(AddFatturaDialogComponent, {
      data : { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  editFattura(_id: string, nome: string, dataEmissione: number, descrizione: string, emettitore: string, tipologia: string, importo: number, numero: number) {

    let data = {_id: _id, nome: nome, dataEmissione: dataEmissione, descrizione: descrizione, emettitore: emettitore, tipologia: tipologia, importo: importo, numero: numero};
    const dialogRef = this.dialog.open(EditFatturaDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  deleteFattura(_id: string, nome: string, descrizione: string) {

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

  detailsFattura(_id: string, nome: string, dataEmissione: number, descrizione: string, emettitore: string,
                 tipologia: string, importo: number, numero: number, pagata: boolean, dataPagamento: number) {

    let data = {_id: _id, nome: nome, dataEmissione: dataEmissione, descrizione: descrizione, emettitore: emettitore,
                tipologia: tipologia, importo: importo, numero: numero, pagata: pagata, dataPagamento: dataPagamento};
    const dialogRef = this.dialog.open(DetailsFatturaDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  pagaFattura(_id: string, nome: string, pagata: boolean, finanziata: boolean, dataPagamento: number) {


    let data = {_id: _id, nome: nome, pagata: pagata, finanziata: finanziata, dataPagamento: dataPagamento};
    const dialogRef = this.dialog.open(PagaFatturaDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    this.calculateTotal();
  }

  calculateTotal(){
    this.totale = 0;
    this.selection.selected.forEach(value => {
      this.totale += value.importo;
    });
  }

  checkItem(row){
    this.selection.toggle(row);
    this.calculateTotal();
  }
}