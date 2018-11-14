import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';
import { TipologiaService } from '../../../services/tipologia.service';
import { Preventivo } from '../../../shared/preventivo';
import { Tipologia } from '../../../shared/tipologia';

import {Subscription } from 'rxjs';

@Component({
  selector: 'app-add-preventivo-dialog',
  templateUrl: './add-preventivo-dialog.component.html',
  styleUrls: ['./add-preventivo-dialog.component.scss']
})
export class AddPreventivoDialogComponent implements OnInit {

  preventivoForm: FormGroup;
  subscription: Subscription;
  tipologie: Tipologia[];

  constructor(public dialogRef: MatDialogRef<AddPreventivoDialogComponent>,
              public preventivoService: PreventivoService,
              public tipologiaService: TipologiaService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subscription = this.tipologiaService.getTipologie().subscribe(tipologie=>{
      this.tipologie = tipologie;
    });

    this.preventivoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      dataEmissione: ['', Validators.required],
      descrizione: [''],
      emettitore: [''],
      tipologia: ['', Validators.required],
      importo: ['', [Validators.required, Validators.min(1)]]
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
    this.preventivoForm.value.tipologia = this.tipologie.find(tipologia => tipologia._id === this.preventivoForm.value.tipologia);
    this.preventivoService.postPreventivo(this.preventivoForm.value);
  }

}