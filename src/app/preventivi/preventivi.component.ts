import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PreventiviDataSource } from './preventivi-datasource';
import { PreventivoService } from '../services/preventivo.service';
import { AddPreventivoDialogComponent } from './dialogs/add/add-preventivo-dialog.component';
import { EditPreventivoDialogComponent } from './dialogs/edit/edit-preventivo-dialog.component';
import { DeletePreventivoDialogComponent } from './dialogs/delete/delete-preventivo-dialog.component';
import { DetailsPreventivoDialogComponent } from './dialogs/details/details-preventivo-dialog.component';
import { AssociaFatturaDialogComponent } from './dialogs/associaFattura/associa-fattura-dialog.component';
import { Preventivo } from '../shared/preventivo';
import { AngularFirestore } from '@angular/fire/firestore';
import { pipe, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-preventivi',
  templateUrl: './preventivi.component.html',
  styleUrls: ['./preventivi.component.css']
})
export class PreventiviComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PreventiviDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'tipologia', 'nome', 'importoIva', 'coperto', 'azioni'];

  subscription: Subscription;
  selection = new SelectionModel<Preventivo>(true, []);
  totale = 0;

  constructor(private preventivoService: PreventivoService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.preventivoService.getPreventivi().subscribe(d=>{
      this.dataSource = new PreventiviDataSource(d, this.paginator, this.sort);   
    });  
  }

  ngOnDestroy(): void {
    if(this.subscription && !this.subscription.closed){
      this.subscription.unsubscribe();
    }
  }

  addNew() {
    const dialogRef = this.dialog.open(AddPreventivoDialogComponent, {
      data : { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  editPreventivo(_id: number, nome: string, descrizione: string,
                 tipologia: string, importo: number, iva: number, importoIva: number) {

    let data = {_id: _id, nome: nome, descrizione: descrizione,
                tipologia: tipologia, importo: importo, iva: iva};
    const dialogRef = this.dialog.open(EditPreventivoDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  deletePreventivo(_id: string, nome: string, descrizione: string) {

    const dialogRef = this.dialog.open(DeletePreventivoDialogComponent, {
      data: {_id: _id, nome: nome, descrizione: descrizione}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.preventivoService.deletePreventivo(_id);
        this.refreshTable();
      }
    });
  }

  detailsPreventivo(_id: number, nome: string, descrizione: string, tipologia: string,
                    importo: number, iva: number, importoIva: number) {

    let data = {_id: _id, nome: nome, descrizione: descrizione,
                tipologia: tipologia, importo: importo, iva: iva};
    const dialogRef = this.dialog.open(DetailsPreventivoDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  associaFattura(_id: number, nome: string) {

    let data = {_id: _id, nome: nome};
    const dialogRef = this.dialog.open(AssociaFatturaDialogComponent, {
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
      this.totale += value.importoIva;
    });
  }

  checkItem(row){
    this.selection.toggle(row);
    this.calculateTotal();
  }
}