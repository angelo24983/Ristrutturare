import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';
import { TipologiaService } from '../../../services/tipologia.service';
import { Preventivo } from '../../../shared/preventivo';
import { Tipologia } from '../../../shared/tipologia';

import {Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-preventivo-dialog',
  templateUrl: './edit-preventivo-dialog.component.html',
  styleUrls: ['./edit-preventivo-dialog.component.scss']
})
export class EditPreventivoDialogComponent implements OnInit {

  preventivoForm: FormGroup;
  subscription: Subscription;
  tipologie: Tipologia[];

  constructor(public dialogRef: MatDialogRef<EditPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public preventivo: Preventivo,
              public preventivoService: PreventivoService,
              public tipologiaService: TipologiaService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subscription = this.tipologiaService.getTipologie().subscribe(tipologie=>{
      this.tipologie = tipologie;
    });

    this.preventivoForm = this.formBuilder.group({
      _id: [this.preventivo._id],
      nome: [this.preventivo.nome, [Validators.required, Validators.minLength(4)]],
      dataEmissione: [new Date(this.preventivo.dataEmissione), Validators.required],
      descrizione: [this.preventivo.descrizione],
      emettitore: [this.preventivo.emettitore],
      tipologia: [this.preventivo.tipologia._id],
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
    this.preventivoForm.value.dataEmissione = new Date( this.preventivoForm.value.dataEmissione).valueOf();
    this.preventivoForm.value.tipologia = this.tipologie.find(tipologia => tipologia._id === this.preventivoForm.value.tipologia);
    this.preventivoService.updatePreventivo(this.preventivoForm.value);
  }

}