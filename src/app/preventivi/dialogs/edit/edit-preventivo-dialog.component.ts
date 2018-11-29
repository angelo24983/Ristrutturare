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
  selector: 'app-edit-preventivo-dialog',
  templateUrl: './edit-preventivo-dialog.component.html',
  styleUrls: ['./edit-preventivo-dialog.component.scss']
})
export class EditPreventivoDialogComponent implements OnInit {

  preventivoForm: FormGroup;
  subscriptionTipologia: Subscription;
  subscriptionIva: Subscription;
  tipologie: Tipologia[];
  valoriIva: Iva[];

  constructor(public dialogRef: MatDialogRef<EditPreventivoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public preventivo: Preventivo,
              public preventivoService: PreventivoService,
              public tipologiaService: TipologiaService,
              public ivaService: IvaService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.subscriptionTipologia = this.tipologiaService.getTipologie().subscribe(tipologie=>{
      this.tipologie = tipologie;
    });

    this.subscriptionIva = this.ivaService.getValoriIva().subscribe(valoriIva=>{
      this.valoriIva = valoriIva;
    });

    this.preventivoForm = this.formBuilder.group({
      _id: [this.preventivo._id],
      nome: [this.preventivo.nome, [Validators.required, Validators.minLength(4)]],
      dataEmissione: [new Date(this.preventivo.dataEmissione), Validators.required],
      descrizione: [this.preventivo.descrizione],
      emettitore: [this.preventivo.emettitore],
      tipologia: [this.preventivo.tipologia._id, [Validators.required]],
      importo: [this.preventivo.importo, [Validators.required, Validators.min(1)]],
      iva: [this.preventivo.iva._id, [Validators.required]]
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
    this.preventivoForm.value.iva = this.valoriIva.find(iva => iva._id === this.preventivoForm.value.iva);
    this.preventivoForm.value.importoIva = this.preventivoForm.value.importo + (this.preventivoForm.value.iva.valore / 100 * this.preventivoForm.value.importo);
    this.preventivoService.updatePreventivo(this.preventivoForm.value);
  }

}