import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Preventivo } from '../../../shared/preventivo';

import { ShowPreventiviDataSource } from './show-preventivi-datasource';

@Component({
  selector: 'app-show-preventivi',
  templateUrl: './show-preventivi.component.html',
  styleUrls: ['./show-preventivi.component.scss']
})
export class ShowPreventiviComponent {

  displayedColumns = ['nome', 'importoIva'];
  dataSource: ShowPreventiviDataSource; 

  constructor(public dialogRef: MatDialogRef<ShowPreventiviComponent>,
              @Inject(MAT_DIALOG_DATA) public preventivi: Preventivo[]) {

    this.dataSource = new ShowPreventiviDataSource(preventivi);   
  }

  cancel(): void {
    this.dialogRef.close();
  }

}