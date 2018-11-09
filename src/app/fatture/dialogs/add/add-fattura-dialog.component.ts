import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { Fattura } from '../../../shared/fattura';

@Component({
  selector: 'app-add-fattura-dialog',
  templateUrl: './add-fattura-dialog.component.html',
  styleUrls: ['./add-fattura-dialog.component.scss']
})
export class AddFatturaDialogComponent implements OnInit {

  fatturaForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddFatturaDialogComponent>,
              public fatturaService: FatturaService,
              public formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {

      this.fatturaForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(4)]],
        date: [''],
        descrizione: ['', Validators.required],
        emettitore: [''],
        tipologia: [''],
        importo: ['', [Validators.required, Validators.min(1)]],
        numero: ['']
      });
  }

  // convenience getter for easy access to form fields
  get fatturaFormControls() {
    return this.fatturaForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.fatturaForm.value.date = new Date( this.fatturaForm.value.date).valueOf();
    this.fatturaService.postFattura(this.fatturaForm.value);
  }
}