import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-preventivo',
  templateUrl: './add-preventivo.component.html',
  styleUrls: ['./add-preventivo.component.scss']
})
export class AddPreventivoComponent implements OnInit {

  preventivo: any = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.preventivo);
  }

}