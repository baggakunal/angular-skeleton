import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlainGridComponent } from './components/plain-grid/plain-grid.component';
import { PlainServerGridComponent } from './components/plain-server-grid/plain-server-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    PlainGridComponent,
    PlainServerGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
