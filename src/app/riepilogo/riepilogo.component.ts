import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { PreventivoService } from '../services/preventivo.service';
import { FatturaService } from '../services/fattura.service';
import { Preventivo } from '../shared/preventivo';
import { Fattura } from '../shared/fattura';
import { ShowFattureComponent } from './dialogs/show-fatture/show-fatture.component';
import { ShowPreventiviComponent } from './dialogs/show-preventivi/show-preventivi.component';

@Component({
  selector: 'riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  subscription : Subscription;

  preventivi: Preventivo[] = [];
  preventiviScoperti: Preventivo[] = [];
  fatture: Fattura[] = [];
  totalePreventivi: number = 0;
  totaleDaPagare: number = 0;
  totalePagato: number = 0;

  // Pie
  pieChartLabels: string[] = ['Pagati', 'Da Pagare'];
  pieChartData: number[];
  pieChartType: string = 'pie';
  pieColors: any[] = [{
    backgroundColor:['#4CAF50', '#F44336'],
    pointHoverBackgroundColor:['#4CAF50', '#F44336']
  }];

  constructor(private preventivoService: PreventivoService,
              private fatturaService: FatturaService,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    this.subscription = this.preventivoService.getPreventivi().subscribe(data=>{
      
      if(data !== null && data !== undefined){
        data.forEach(preventivo => {
          this.preventivi.push(preventivo);
          this.totalePreventivi += preventivo.importoIva;
          if(preventivo.importoDaPagare > 0){
            this.preventiviScoperti.push(preventivo);
            this.totaleDaPagare += preventivo.importoDaPagare;
          }
        });

        this.subscription = this.fatturaService.getFatture().subscribe(data=>{
          data.forEach(fattura => {
            this.fatture.push(fattura);
            this.totalePagato += fattura.importo;
          });

          this.pieChartData = [this.totalePagato, this.totaleDaPagare];
        });  
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription && !this.subscription.closed){
      this.subscription.unsubscribe();
    }
  }

  // events
  chartClicked(e:any):void {
    let _active = e.active[0];
    if(_active !== undefined && _active !== null){
      let _clickedElementIndex = e.active[0]._index;
      if(_clickedElementIndex === 0){
        this.showFatture();
      }
      else if(_clickedElementIndex === 1){
        this.showPreventiviScoperti();
      }
    }
  }

  showFatture() {
    const dialogRef = this.dialog.open(ShowFattureComponent, {
      data: this.fatture
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
      }
    });
  }

  showPreventiviScoperti() {
    const dialogRef = this.dialog.open(ShowPreventiviComponent, {
      data: this.preventiviScoperti
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
      }
    });
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }
  
}