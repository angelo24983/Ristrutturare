import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewFattureDataSource } from './view-fatture-datasource';

@Component({
  selector: 'view-fatture',
  templateUrl: './view-fatture.component.html',
  styleUrls: ['./view-fatture.component.css']
})
export class ViewFattureComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewFattureDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ViewFattureDataSource(this.paginator, this.sort);
  }
}
