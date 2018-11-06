import { Component, OnInit } from '@angular/core';

import { FatturaService } from '../services/fattura.service';
import { Fattura } from '../shared/fattura';

@Component({
  selector: 'app-add-fattura',
  templateUrl: './add-fattura.component.html',
  styleUrls: ['./add-fattura.component.scss']
})
export class AddFatturaComponent implements OnInit {

  fattura: any = {};

  constructor(private fatturaService : FatturaService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.fattura.date = new Date(this.fattura.date).valueOf();
    this.fatturaService.postFattura(this.fattura)
      .then(() => {
        this.fattura = {};
        console.log('success');
      },
      err => console.log("Error ", err));
  }

}