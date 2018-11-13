import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FatturaService } from '../../../services/fattura.service';
import { Fattura } from '../../../shared/fattura';

@Component({
  selector: 'app-paga-fattura-dialog',
  templateUrl: './paga-fattura-dialog.component.html',
  styleUrls: ['./paga-fattura-dialog.component.scss']
})
export class PagaFatturaDialogComponent implements OnInit {

  pagaFatturaForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<PagaFatturaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public fattura: Fattura,
              public fatturaService: FatturaService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

      this.pagaFatturaForm = this.formBuilder.group({
        _id: [this.fattura._id],
        pagata: [this.fattura.pagata],
        finanziata: [this.fattura.finanziata],
        dataPagamento: [new Date(this.fattura.dataPagamento), Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get pagaFatturaFormControls() {
    return this.pagaFatturaForm.controls;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.pagaFatturaForm.value.dataPagamento = new Date(this.pagaFatturaForm.value.dataPagamento).valueOf();
    this.fatturaService.pagaFattura(this.pagaFatturaForm.value);
  }

}