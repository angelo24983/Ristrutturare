import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { Fattura } from '../../../shared/fattura';

@Component({
  selector: 'app-add-fattura-dialog',
  templateUrl: './add-fattura-dialog.component.html',
  styleUrls: ['./add-fattura-dialog.component.scss']
})
export class AddFatturaDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Fattura,
              public fatturaService: FatturaService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.data.date = new Date(this.data.date).valueOf();
    this.fatturaService.postFattura(this.data);
  }
}