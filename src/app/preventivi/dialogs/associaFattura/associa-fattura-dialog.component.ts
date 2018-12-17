import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { PreventivoFattureService } from '../../../services/preventivo-fatture.service';
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
  subscriptionFattureAssociate: Subscription;
  fatture: Fattura[];

  constructor(public dialogRef: MatDialogRef<AssociaFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fatturaService: FatturaService,
              public preventivoFattureService: PreventivoFattureService,
              public formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {

    this.subscriptionFatture = this.fatturaService.getFatture().subscribe(fatture => {
      this.fatture = fatture;
    });

    this.associaFatturaForm = this.formBuilder.group({
      preventivoId: [this.data._id],
      fatture: ['']
    });

    this.subscriptionFattureAssociate = this.preventivoFattureService.getPreventivoFattureDB(this.data._id)
      .subscribe(preventiviFattureDB => {
        this.associaFatturaForm.patchValue({
          fatture: preventiviFattureDB.map(element => element.fatturaId)
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
    this.preventivoFattureService.deletePreventivoFattureDB(this.associaFatturaForm.value.preventivoId);

    this.associaFatturaForm.value.fatture.forEach(element => {
      this.preventivoFattureService.postPreventivoFatturaDB(this.associaFatturaForm.value.preventivoId,element)});
  }
}