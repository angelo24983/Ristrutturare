import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PreventivoService } from '../../../services/preventivo.service';
import { TipologiaService } from '../../../services/tipologia.service';
import { IvaService } from '../../../services/iva.service';

import { Preventivo } from '../../../shared/preventivo';
import { Tipologia } from '../../../shared/tipologia';
import { Iva } from '../../../shared/iva';

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
  valoriIva: Iva[];

  constructor(public dialogRef: MatDialogRef<AddPreventivoDialogComponent>,
              public preventivoService: PreventivoService,
              public tipologiaService: TipologiaService,
              public ivaService: IvaService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subscription = this.tipologiaService.getTipologie().subscribe(tipologie=>{
      this.tipologie = tipologie;
    });

    this.subscription = this.ivaService.getValoriIva().subscribe(valoriIva=>{
      this.valoriIva = valoriIva;
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
    this.preventivoForm.value.iva = this.valoriIva.find(iva => iva._id === this.preventivoForm.value.iva);
    this.preventivoForm.value.importoIva = Math.round(this.preventivoForm.value.importo +
     (this.preventivoForm.value.iva.valore / 100 * this.preventivoForm.value.importo)) * 100 / 100;
    this.preventivoService.postPreventivo(this.preventivoForm.value);
  }

}