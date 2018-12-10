import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PreventivoService } from '../services/preventivo.service';
import { FatturaService } from '../services/fattura.service';
import { Preventivo } from '../shared/preventivo';
import { Fattura } from '../shared/fattura';

@Component({
  selector: 'riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {
  subscription : Subscription;
  totalePreventivi: number = 0;
  totaleFatture: number = 0;

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
              private router: Router) {
  }

  ngOnInit() {

    this.subscription = this.preventivoService.getPreventivi().subscribe(data=>{
      
      if(data !== null && data !== undefined){
        data.forEach(preventivo => {
          this.totalePreventivi += preventivo.importoIva;
        });

        this.totalePreventivi = Math.round(this.totalePreventivi * 100) / 100

        this.subscription = this.fatturaService.getFatture().subscribe(data=>{
          data.forEach(fattura => {
            this.totaleFatture += fattura.importo;
          });

          this.totaleFatture = Math.round(this.totaleFatture * 100) / 100

          this.pieChartData = [this.totaleFatture, this.totalePreventivi - this.totaleFatture];
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
        this.router.navigate(['home/fatture']);
        
      }
      else if(_clickedElementIndex === 1){
        this.router.navigate(['home/preventivi']);
      }
    }
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }
  
}