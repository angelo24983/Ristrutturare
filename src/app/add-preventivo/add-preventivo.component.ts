import { Component, OnInit } from '@angular/core';

import { PreventivoService } from '../services/preventivo.service';
import { Preventivo } from '../shared/preventivo';

@Component({
  selector: 'app-add-preventivo',
  templateUrl: './add-preventivo.component.html',
  styleUrls: ['./add-preventivo.component.scss']
})
export class AddPreventivoComponent implements OnInit {

  preventivo: any = {};

  constructor(private preventivoService: PreventivoService ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.preventivo.date = new Date(this.preventivo.date).valueOf();
    this.preventivoService.postPreventivo(this.preventivo)
      .then(() => {
        this.preventivo = {};
        console.log('success');
      },
      err => console.log("Error ", err));
  }

}