import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen1OvenFunctionComponent } from './screen1-oven-function.component';

describe('Screen1OvenFunctionComponent', () => {
  let component: Screen1OvenFunctionComponent;
  let fixture: ComponentFixture<Screen1OvenFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen1OvenFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen1OvenFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
