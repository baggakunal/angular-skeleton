import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { GameDetail } from '../../../../app.entities';
import { GameFieldConfig, GameFieldName } from '../../games.entities';

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {
    @Input() game: GameDetail;
    @Input() gameFieldConfig: { array: Array<GameFieldConfig>, map: { [key in GameFieldName]?: GameFieldConfig } };

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() { }
}
