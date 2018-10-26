import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewPreventiviDataSource } from './view-preventivi-datasource';

@Component({
  selector: 'view-preventivi',
  templateUrl: './view-preventivi.component.html',
  styleUrls: ['./view-preventivi.component.css']
})
export class ViewPreventiviComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewPreventiviDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ViewPreventiviDataSource(this.paginator, this.sort);
  }
}
