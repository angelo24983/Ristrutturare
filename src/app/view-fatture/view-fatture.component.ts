import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewFattureDataSource, ViewFattureItem } from './view-fatture-datasource';
import { AngularFirestore } from '@angular/fire/firestore';
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
  displayedColumns = ['date', 'text'];
  subscription: Subscription;

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
   this.subscription = this.db.collection<ViewFattureItem>('/fatture').valueChanges().pipe(first()).subscribe(d=>{
      console.log('data streaming');
      this.dataSource = new ViewFattureDataSource(this.paginator, this.sort);   
      this.dataSource.data = d;
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
