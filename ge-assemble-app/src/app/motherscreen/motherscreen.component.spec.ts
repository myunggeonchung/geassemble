import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherscreenComponent } from './motherscreen.component';

describe('MotherscreenComponent', () => {
  let component: MotherscreenComponent;
  let fixture: ComponentFixture<MotherscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotherscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
