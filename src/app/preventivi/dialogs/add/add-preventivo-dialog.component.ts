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
  valoriIva: any[];

  constructor(public dialogRef: MatDialogRef<AddPreventivoDialogComponent>,
              public preventivoService: PreventivoService,
              public tipologiaService: TipologiaService,
              public formBuilder: FormBuilder) {

                this.valoriIva = [{id: 10, label: '10 %'},{id: 22, label: '22 %'}];
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
      importo: ['', [Validators.required, Validators.min(1)]],
      iva: ['', [Validators.required]]
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
    this.preventivoForm.value.importoIva = this.preventivoForm.value.importo + (this.preventivoForm.value.iva / 100 * this.preventivoForm.value.importo);
    this.preventivoService.postPreventivo(this.preventivoForm.value);
  }

}