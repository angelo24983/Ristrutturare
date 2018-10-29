import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewPreventiviDataSource } from './view-preventivi-datasource';
import { Preventivo } from '../shared/preventivo';
import { AngularFirestore } from '@angular/fire/firestore';
import { pipe, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-view-preventivi',
  templateUrl: './view-preventivi.component.html',
  styleUrls: ['./view-preventivi.component.css']
})
export class ViewPreventiviComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewPreventiviDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'titolo', 'descrizione', 'tipologia', 'emettitore', 'importo', 'numero'];
  subscription: Subscription;

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
   this.subscription = this.db.collection<Preventivo>('/preventivi').valueChanges().pipe(first()).subscribe(d=>{
      console.log('data streaming');
      this.dataSource = new ViewPreventiviDataSource(this.paginator, this.sort);   
      this.dataSource.data = d;
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
