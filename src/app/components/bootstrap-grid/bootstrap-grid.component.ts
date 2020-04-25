import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bootstrap-grid',
  templateUrl: './bootstrap-grid.component.html',
  styleUrls: ['./bootstrap-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BootstrapGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
