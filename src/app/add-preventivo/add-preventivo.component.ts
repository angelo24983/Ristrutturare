import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Preventivo } from '../shared/preventivo';

@Component({
  selector: 'app-add-preventivo',
  templateUrl: './add-preventivo.component.html',
  styleUrls: ['./add-preventivo.component.scss']
})
export class AddPreventivoComponent implements OnInit {

  preventivo: any = {};

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  onSubmit() {
    this.preventivo.date = new Date(this.preventivo.date).valueOf();
    this.db.collection('/preventivi').add(this.preventivo)
     .then(_ => {
       this.preventivo = {};
       console.log('success')
     }) 
  }

}