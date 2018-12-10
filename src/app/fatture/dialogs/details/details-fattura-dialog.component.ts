import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Fattura } from '../../../shared/fattura';

@Component({
  selector: 'app-details-fattura-dialog',
  templateUrl: './details-fattura-dialog.component.html',
  styleUrls: ['./details-fattura-dialog.component.scss']
})
export class DetailsFatturaDialogComponent {

  constructor(public dialogRef: MatDialogRef<DetailsFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public fattura: Fattura
              ) { 
  }

  cancel(): void {
    this.dialogRef.close();
  }

}