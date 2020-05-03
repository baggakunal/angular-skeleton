import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faTh } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { GamesComponent } from './components/games/games.component';
import { GridComponent } from './components/games/grid/grid.component';
import { TilesComponent } from './components/games/tiles/tiles.component';
import { TileComponent } from './components/games/tiles/tile/tile.component';

@NgModule({
    declarations: [
        AppComponent,
        GamesComponent,
        GridComponent,
        TilesComponent,
        TileComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatButtonToggleModule,
        FontAwesomeModule,
        AppRoutingModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private faLibrary: FaIconLibrary) {
        this.faLibrary.addIcons(faBars, faTh);
    }
}
