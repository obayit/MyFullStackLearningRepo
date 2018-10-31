import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as CanvasJS from '../canvasjs.min'

import { PerfService } from '../perf.service'

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.css']
})
export class CpuUsageComponent implements OnInit {
  public data: number[];
  public labels = ['Usage', ''];
  public percentage: number;

  constructor(
    private perfService: PerfService
  ) { }

  ngOnInit() {
    this.getPercentage();
  }

  getPercentage(){
    this.perfService.getCpu().subscribe(
      //percentage => this.data = [percentage, 100-percentage],
      p => this.percentage = p
    );
  }

}
