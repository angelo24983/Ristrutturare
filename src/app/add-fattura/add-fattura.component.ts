import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Fattura } from '../shared/fattura';

@Component({
  selector: 'app-add-fattura',
  templateUrl: './add-fattura.component.html',
  styleUrls: ['./add-fattura.component.scss']
})
export class AddFatturaComponent implements OnInit {

  fattura: any = {};

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  onSubmit() {
    this.fattura.date = new Date(this.fattura.date).valueOf();
    this.db.collection('/fatture').add(this.fattura)
     .then(_ => {
       this.fattura = {};
       console.log('success')
     })  
  }

}