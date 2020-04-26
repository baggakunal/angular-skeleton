import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GamesGridComponent } from './games-grid.component';

describe('GamesGridComponent', () => {
  let component: GamesGridComponent;
  let fixture: ComponentFixture<GamesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GamesGridComponent],
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
