import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ItemDetail } from '../../../app.entities';

@Component({
  selector: 'app-items-grid',
  templateUrl: './items-grid.component.html',
  styleUrls: ['./items-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsGridComponent implements OnInit {
  @Input() items: Array<ItemDetail> = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }
}
