import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { GameDetail } from '../../../app.entities';

@Component({
  selector: 'app-games-tiles',
  templateUrl: './games-tiles.component.html',
  styleUrls: ['./games-tiles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsTilesComponent implements OnInit {
  @Input() games: Array<GameDetail> = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }
}
