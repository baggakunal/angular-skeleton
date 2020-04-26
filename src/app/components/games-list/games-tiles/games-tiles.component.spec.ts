import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ItemsTilesComponent } from './items-tiles.component';

describe('ItemsTilesComponent', () => {
  let component: ItemsTilesComponent;
  let fixture: ComponentFixture<ItemsTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsTilesComponent],
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
