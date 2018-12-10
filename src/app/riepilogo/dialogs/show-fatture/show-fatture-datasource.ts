import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';

import { Fattura } from '../../../shared/fattura';

/**
 * Data source for the ViewPreventivi view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ShowFattureDataSource extends DataSource<Fattura> {
  data: any;

  constructor(private _data: Fattura[]) {
    super();
    this.data = new BehaviorSubject<Fattura[]>(_data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Fattura[]> {
    return this.data;
  }

  disconnect() {}
}