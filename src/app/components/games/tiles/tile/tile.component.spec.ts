import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TileComponent } from './tile.component';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TileComponent],
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
