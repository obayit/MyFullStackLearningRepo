import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as $ from 'jquery';
import { debounceTime } from 'rxjs/operators';
import * as asdflkj from 'chart.js';


import { PerfService } from '../perf.service'
import { Observable } from 'rxjs';

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
  public cpuUpdateRateMs = 1000;

  chartType = 'line';
  chartData: LineChartData[]  = [];
  chartLabels = [];
  chartOptions = {
    responsive: true,
    elements: {
        line: {
            tension: 0, // disables bezier curves
        }
    }
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

  counter = 0;

  @Input() censusData = {};
  @Output() newEntry: EventEmitter<Option> = new EventEmitter();


  constructor(
    private perfService: PerfService
  ) { }

  ngOnInit() {
    this.getPercentage();
  }

  getPercentage(){
    this.perfService.getCpu().subscribe(
      //percentage => this.data = [percentage, 100-percentage],
      async(p) => {
        this.percentage = p;

        if(this.chartData.length>0){
          var newData = this.chartData.slice();
          var newInnerData = newData[0].data.slice();
          newInnerData.push(p);
          newData[0].data = newInnerData;
          this.chartData = newData;
        }else{
          this.chartData = [{data: [p], label: 'CPU'} as LineChartData];
        }

        //{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        await delay(this.cpuUpdateRateMs);

        this.getPercentage();
      }
    );
  }

  toggle(){
    //this.chartType = this.chartType === 'doughnut' ? 'pie' : 'doughnut';
    this.chartType = 'pie';
  }


  drawCpuChart(){

  }

}
