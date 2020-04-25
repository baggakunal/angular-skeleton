import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapGridComponent } from './bootstrap-grid.component';

describe('BootstrapGridComponent', () => {
  let component: BootstrapGridComponent;
  let fixture: ComponentFixture<BootstrapGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
