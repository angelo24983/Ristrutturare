import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { PreventivoService } from '../../../services/preventivo.service';
import { Fattura } from '../../../shared/fattura';
import { Preventivo } from '../../../shared/preventivo';

import {Subscription } from 'rxjs';

@Component({
  selector: 'app-associa-fattura-dialog',
  templateUrl: './associa-fattura-dialog.component.html',
  styleUrls: ['./associa-fattura-dialog.component.scss']
})
export class AssociaFatturaDialogComponent implements OnInit {

  associaFatturaForm: FormGroup;
  subscriptionFatture: Subscription;
  subscriptionPreventivo: Subscription;
  fatture: Fattura[];
  preventivo: Preventivo;

  constructor(public dialogRef: MatDialogRef<AssociaFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fatturaService: FatturaService,
              public preventivoService: PreventivoService,
              public formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {

    this.associaFatturaForm = this.formBuilder.group({
      preventivoId: [this.data._id],
      fatture: ['']
    });

    this.subscriptionFatture = this.fatturaService.getFatture().subscribe(fatture => {
      this.fatture = fatture;
    });

    this.subscriptionPreventivo = this.preventivoService.getPreventivo(this.data._id).subscribe(preventivo => {
      this.preventivo = preventivo;
       this.associaFatturaForm.patchValue({
          fatture: this.preventivo.fatture.map(fattura => fattura._id)
        });
    });
  }

  // convenience getter for easy access to form fields
  get associaFatturaFormControls() {
    return this.associaFatturaForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {

    //delete-insert policy

    this.preventivo.fatture = [];
    this.preventivo.coperto = false;

    let totaleFatture = 0;

    this.associaFatturaForm.value.fatture.forEach(element => {
      this.preventivo.fatture.push(this.fatture.find(fattura => fattura._id === element));
    });

    this.preventivo.fatture.forEach(fattura => {
      totaleFatture += fattura.importo;
    });

    if(this.preventivo.importoIva === totaleFatture){
      this.preventivo.coperto = true;
    }

    this.preventivoService.updatePreventivo(this.preventivo);
  }
}