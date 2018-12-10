import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';

import { Preventivo } from '../../../shared/preventivo';

/**
 * Data source for the ViewPreventivi view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ShowPreventiviDataSource extends DataSource<Preventivo> {
  data: any;

  constructor(private _data: Preventivo[]) {
    super();
    this.data = new BehaviorSubject<Preventivo[]>(_data);
  }

  connect(): Observable<Preventivo[]> {
    return this.data;
  }

  disconnect() {}
}