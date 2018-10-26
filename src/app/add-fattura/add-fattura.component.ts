import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-fattura',
  templateUrl: './add-fattura.component.html',
  styleUrls: ['./add-fattura.component.scss']
})
export class AddFatturaComponent implements OnInit {

  fattura: any = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.fattura);
  }

}