import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';

@Component({
  selector: 'app-edit-preventivo-dialog',
  templateUrl: './edit-preventivo-dialog.component.html',
  styleUrls: ['./edit-preventivo-dialog.component.scss']
})
export class EditPreventivoDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public preventivoService: PreventivoService) {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.preventivoService.updatePreventivo(this.data);
  }

}