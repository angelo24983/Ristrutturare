import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';
import { Preventivo } from '../../../shared/preventivo';

@Component({
  selector: 'app-add-preventivo-dialog',
  templateUrl: './add-preventivo-dialog.component.html',
  styleUrls: ['./add-preventivo-dialog.component.scss']
})
export class AddPreventivoDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Preventivo,
              public preventivoService: PreventivoService) { }

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

  public confirmAdd(): void {
    this.data.date = new Date(this.data.date).valueOf();
    this.preventivoService.postPreventivo(this.data);
  }

}
