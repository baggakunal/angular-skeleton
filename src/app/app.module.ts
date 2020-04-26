import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemsGridComponent } from './components/items-list/items-grid/items-grid.component';
import { ItemsTilesComponent } from './components/items-list/items-tiles/items-tiles.component';

@NgModule({
    declarations: [
        AppComponent,
        ItemsListComponent,
        ItemsGridComponent,
        ItemsTilesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
