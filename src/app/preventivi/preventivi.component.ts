import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PreventiviDataSource } from './preventivi-datasource';
import { PreventivoService } from '../services/preventivo.service';
import { AddPreventivoDialogComponent } from './dialogs/add/add-preventivo-dialog.component';
import { EditPreventivoDialogComponent } from './dialogs/edit/edit-preventivo-dialog.component';
import { DeletePreventivoDialogComponent } from './dialogs/delete/delete-preventivo-dialog.component';
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
  displayedColumns = ['dataEmissione', 'nome', 'descrizione', 'tipologia',
                      'emettitore', 'importo', 'iva', 'importoIva', 'azioni'];
  subscription: Subscription;

  constructor(private preventivoService: PreventivoService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.preventivoService.getPreventivi().subscribe(d=>{
      this.dataSource = new PreventiviDataSource(d, this.paginator, this.sort);   
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  startEdit(_id: number, nome: string, dataEmissione: number, descrizione: string,
            emettitore: string, tipologia: string, importo: number, iva: number, importoIva: number) {

    let data = {_id: _id, nome: nome, dataEmissione: dataEmissione, descrizione: descrizione, emettitore: emettitore,
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

  deleteItem(_id: string, nome: string, descrizione: string) {

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

  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
