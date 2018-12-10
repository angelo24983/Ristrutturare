import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ShowFattureDataSource } from './show-fatture-datasource';
import { Fattura } from '../../../shared/fattura';

@Component({
  selector: 'app-show-fatture',
  templateUrl: './show-fatture.component.html',
  styleUrls: ['./show-fatture.component.scss']
})
export class ShowFattureComponent {
  
  displayedColumns = ['nome', 'importo', 'pagata'];
  dataSource: ShowFattureDataSource;

  constructor(public dialogRef: MatDialogRef<ShowFattureComponent>,
              @Inject(MAT_DIALOG_DATA) public fatture: Fattura[]) {

    this.dataSource = new ShowFattureDataSource(fatture);   
  }

  cancel(): void {
    this.dialogRef.close();
  }

}