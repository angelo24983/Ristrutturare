import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Preventivo } from '../../../shared/preventivo';

import {Subscription } from 'rxjs';

@Component({
  selector: 'app-details-preventivo-dialog',
  templateUrl: './details-preventivo-dialog.component.html',
  styleUrls: ['./details-preventivo-dialog.component.scss']
})
export class DetailsPreventivoDialogComponent {

  constructor(public dialogRef: MatDialogRef<DetailsPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public preventivo: Preventivo
              ) { 
  }

  cancel(): void {
    this.dialogRef.close();
  }

}