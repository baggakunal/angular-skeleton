import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { GameDetail } from '../../../app.entities';
import { GameFieldConfig, GameFieldName } from '../games.entities';

@Component({
    selector: 'app-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TilesComponent implements OnInit {
    @Input() games: Array<GameDetail> = [];
    @Input() gameFieldConfig: { array: Array<GameFieldConfig>, map: { [key in GameFieldName]?: GameFieldConfig } };

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() { }

    trackByGame(game: GameDetail) {
        return game && game.title;
    }
}
