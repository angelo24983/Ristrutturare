import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { Preventivo } from '../shared/preventivo';

/**
 * Data source for the ViewPreventivi view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PreventiviDataSource extends DataSource<Preventivo> {
  data: Preventivo[] = [];

  constructor(private _data: Preventivo[],
              private paginator: MatPaginator,
              private sort: MatSort) {
    super();
    this.data = _data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Preventivo[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Preventivo[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Preventivo[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'dataEmissione': return compare(+a.dataEmissione, +b.dataEmissione, isAsc);
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'descrizione': return compare(a.descrizione, b.descrizione, isAsc);
        case 'tipologia': return compare(a.tipologia, b.tipologia, isAsc);
        case 'emettitore': return compare(a.emettitore, b.emettitore, isAsc);
        case 'importo': return compare(+a.importo, +b.importo, isAsc);
        case 'iva': return compare(+a.iva, +b.iva, isAsc);
        case 'importoIva': return compare(+a.importoIva, +b.importoIva, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
