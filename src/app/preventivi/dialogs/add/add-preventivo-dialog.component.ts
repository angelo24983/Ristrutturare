import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';
import { Preventivo } from '../../../shared/preventivo';

@Component({
  selector: 'app-add-preventivo-dialog',
  templateUrl: './add-preventivo-dialog.component.html',
  styleUrls: ['./add-preventivo-dialog.component.scss']
})
export class AddPreventivoDialogComponent implements OnInit {

  preventivoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public preventivo: Preventivo,
              public preventivoService: PreventivoService,
              public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

      this.preventivoForm = this.formBuilder.group({
        nome: [this.preventivo.nome, [Validators.required, Validators.minLength(4)]],
        dataEmissione: [this.preventivo.dataEmissione],
        descrizione: [this.preventivo.descrizione],
        emettitore: [this.preventivo.emettitore],
        tipologia: [this.preventivo.tipologia],
        importo: [this.preventivo.importo, [Validators.required, Validators.min(1)]]
      });
  }

  // convenience getter for easy access to form fields
  get preventivoFormControls() {
    return this.preventivoForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.preventivoForm.value.dataEmissione = new Date(this.preventivoForm.value.dataEmissione).valueOf();
    this.preventivoService.postPreventivo(this.preventivoForm.value);
  }

}