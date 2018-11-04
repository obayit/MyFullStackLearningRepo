import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Observable, interval } from 'rxjs';
import { switchMap, map, startWith, debounceTime } from 'rxjs/operators';

import { PerfService } from '../perf.service'

interface Option {
  label: string;
  selected: boolean;
  value: string;
}
interface LineChartData {
  data: number[];
  label: string;
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.css']
})
export class CpuUsageComponent implements OnInit {
  public percentage: number;
  public cpuUsage: Observable<number[]>;
  public counterUpdateRateMs = 5000;

  @Input() counterUrl: string;
  @Input() chartTitle: string;

  chartType = 'line';
  chartDataSize = 10;
  chartData: LineChartData[];
  chartLabels: Array<string>;
  chartOptions = {
    responsive: true,
    elements: {
        line: {
            tension: 0, // disables bezier curves
        }
    },
    animation: {
      duration: 0,
    },
    layout: {
    },
  };
  public chartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];


  @Output() newEntry: EventEmitter<Option> = new EventEmitter();
  counterValue$: Observable<any>;


  constructor(
    private perfService: PerfService
  ) { }

  ngOnInit() {
    if(!this.counterUrl.trim()){
      return;
    }

    this.chartLabels = new Array<string>(this.chartDataSize);
    for(let i=0; i<this.chartLabels.length; i++){
      this.chartLabels[i] = '' + (i+1);
    }
    this.counterValue$ = interval(this.counterUpdateRateMs).pipe(
      switchMap(() => this.perfService.getCounter(this.counterUrl)),
      map(i => this.updateChart(i)),
    );
    this.counterValue$.subscribe(v => console.log(v));
  }

  async updateChart(p: number){
    console.log("calling updateChart with " + p);
    this.percentage = p;
    if(p > 0 && p <= 100){

      if(this.chartData && this.chartData.length>0){
        let _lineChartData:Array<any> = new Array(this.chartData.length);
        for (let i = 0; i < this.chartData.length; i++) {
          _lineChartData[i] = {data: new Array(this.chartData[i].data.length), label: this.chartData[i].label};
          for (let j = 0; j < this.chartData[i].data.length - 1; j++) {
            _lineChartData[i].data[j] = this.chartData[i].data[j+1];
          }
          _lineChartData[i].data[this.chartData[i].data.length-1] = p;
        }
        this.chartData = _lineChartData;
      }else{
        var innerData = new Array<number>(this.chartDataSize).fill(0);
        innerData[this.chartDataSize - 1] = p;
        this.chartData = [{data: innerData, label: this.chartTitle} as LineChartData];
      }
    }
    //{data reference: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  }

}
