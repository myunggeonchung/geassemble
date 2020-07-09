import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen1AcFunctionComponent } from './screen1-ac-function.component';

describe('Screen1AcFunctionComponent', () => {
  let component: Screen1AcFunctionComponent;
  let fixture: ComponentFixture<Screen1AcFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen1AcFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen1AcFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
