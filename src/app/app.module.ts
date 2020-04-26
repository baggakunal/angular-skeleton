import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesGridComponent } from './components/games-list/games-grid/games-grid.component';
import { ItemsTilesComponent } from './components/games-list/games-tiles/games-tiles.component';

@NgModule({
    declarations: [
        AppComponent,
        GamesListComponent,
        GamesGridComponent,
        ItemsTilesComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        AppRoutingModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
