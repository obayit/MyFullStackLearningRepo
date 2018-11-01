import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http'

import {ChartsModule} from 'ng2-charts';
import { AppComponent } from './app.component';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';

@NgModule({
  declarations: [
    AppComponent,
    CpuUsageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
