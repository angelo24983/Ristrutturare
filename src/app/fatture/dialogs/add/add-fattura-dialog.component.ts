import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { TipologiaService } from '../../../services/tipologia.service';
import { Fattura } from '../../../shared/fattura';
import { Tipologia } from '../../../shared/tipologia';

import {Subscription } from 'rxjs';

@Component({
  selector: 'app-add-fattura-dialog',
  templateUrl: './add-fattura-dialog.component.html',
  styleUrls: ['./add-fattura-dialog.component.scss']
})
export class AddFatturaDialogComponent implements OnInit {

  fatturaForm: FormGroup;
  subscription: Subscription;
  tipologie: Tipologia[];

  constructor(public dialogRef: MatDialogRef<AddFatturaDialogComponent>,
              public fatturaService: FatturaService,
              public tipologiaService: TipologiaService,
              public formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {

    this.subscription = this.tipologiaService.getTipologie().subscribe(tipologie=>{
      this.tipologie = tipologie;
    });

    this.fatturaForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      dataEmissione: ['',  Validators.required],
      descrizione: [''],
      emettitore: [''],
      tipologia: ['', Validators.required],
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
    this.fatturaForm.value.dataEmissione = new Date( this.fatturaForm.value.dataEmissione).valueOf();
    this.fatturaForm.value.tipologia = this.tipologie.find(tipologia => tipologia._id === this.fatturaForm.value.tipologia);
    this.fatturaService.postFattura(this.fatturaForm.value);
  }
}