import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PreventivoService } from '../../../services/preventivo.service';

@Component({
  selector: 'app-delete-preventivo-dialog',
  templateUrl: './delete-preventivo-dialog.component.html',
  styleUrls: ['./delete-preventivo-dialog.component.scss']
})
export class DeletePreventivoDialogComponent {

   constructor(public dialogRef: MatDialogRef<DeletePreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public preventivoService: PreventivoService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.preventivoService.deletePreventivo(this.data._id);
  }

}