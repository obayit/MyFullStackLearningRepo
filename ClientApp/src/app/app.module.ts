import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import {ChartsModule} from 'ng2-charts';
import { AppComponent } from './app.component';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';
import { MyFormComponent } from './my-form/my-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CpuUsageComponent,
    MyFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
