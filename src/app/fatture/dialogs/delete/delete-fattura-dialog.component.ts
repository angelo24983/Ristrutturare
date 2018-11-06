import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FatturaService } from '../../../services/fattura.service';

@Component({
  selector: 'app-delete-fattura-dialog',
  templateUrl: './delete-fattura-dialog.component.html',
  styleUrls: ['./delete-fattura-dialog.component.scss']
})
export class DeleteFatturaDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: FatturaService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteFattura(this.data._id);
  }

}
