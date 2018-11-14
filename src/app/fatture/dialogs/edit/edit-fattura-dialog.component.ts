import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { TipologiaService } from '../../../services/tipologia.service';
import { Fattura } from '../../../shared/fattura';
import { Tipologia } from '../../../shared/tipologia';

import {Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-fattura-dialog',
  templateUrl: './edit-fattura-dialog.component.html',
  styleUrls: ['./edit-fattura-dialog.component.scss']
})
export class EditFatturaDialogComponent implements OnInit {

  fatturaForm: FormGroup;
  subscription: Subscription;
  tipologie: Tipologia[];

  constructor(public dialogRef: MatDialogRef<EditFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public fattura: Fattura,
              public fatturaService: FatturaService,
              public tipologiaService: TipologiaService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subscription = this.tipologiaService.getTipologie().subscribe(tipologie=>{
      this.tipologie = tipologie;
    });

    this.fatturaForm = this.formBuilder.group({
      _id: [this.fattura._id],
      nome: [this.fattura.nome, [Validators.required, Validators.minLength(4)]],
      dataEmissione: [new Date(this.fattura.dataEmissione), Validators.required],
      descrizione: [this.fattura.descrizione],
      emettitore: [this.fattura.emettitore],
      tipologia: [this.fattura.tipologia._id, Validators.required],
      importo: [this.fattura.importo, [Validators.required, Validators.min(1)]],
      numero: [this.fattura.numero]
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
    this.fatturaForm.value.dataEmissione = new Date(this.fatturaForm.value.dataEmissione).valueOf();
    this.fatturaForm.value.tipologia = this.tipologie.find(tipologia => tipologia._id === this.fatturaForm.value.tipologia);
    this.fatturaService.updateFattura(this.fatturaForm.value);
  }

}