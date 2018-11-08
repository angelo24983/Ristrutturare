import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FatturaService } from '../../../services/fattura.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-fattura-dialog',
  templateUrl: './edit-fattura-dialog.component.html',
  styleUrls: ['./edit-fattura-dialog.component.scss']
})
export class EditFatturaDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fatturaService: FatturaService) {
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
    this.fatturaService.updateFattura(this.data);
  }

}