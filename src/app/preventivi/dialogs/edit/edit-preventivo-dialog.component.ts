import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';
import { Preventivo } from '../../../shared/preventivo';

@Component({
  selector: 'app-edit-preventivo-dialog',
  templateUrl: './edit-preventivo-dialog.component.html',
  styleUrls: ['./edit-preventivo-dialog.component.scss']
})
export class EditPreventivoDialogComponent implements OnInit {

  preventivoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public preventivo: Preventivo,
              public preventivoService: PreventivoService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

      this.preventivoForm = this.formBuilder.group({
        _id: [this.preventivo._id],
        nome: [this.preventivo.nome, [Validators.required, Validators.minLength(4)]],
        date: [new Date(this.preventivo.date), Validators.required],
        descrizione: [this.preventivo.descrizione],
        emettitore: [this.preventivo.emettitore],
        tipologia: [this.preventivo.tipologia],
        importo: [this.preventivo.importo, [Validators.required, Validators.min(1)]],
        numero: [this.preventivo.numero]
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
    this.preventivoForm.value.date = new Date( this.preventivoForm.value.date).valueOf();
    this.preventivoService.updatePreventivo(this.preventivoForm.value);
  }

}