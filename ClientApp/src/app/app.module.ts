import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';

@NgModule({
  declarations: [
    AppComponent,
    CpuUsageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
