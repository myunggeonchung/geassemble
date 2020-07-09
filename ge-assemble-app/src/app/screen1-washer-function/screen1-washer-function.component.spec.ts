import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen1WasherFunctionComponent } from './screen1-washer-function.component';

describe('Screen1WasherFunctionComponent', () => {
  let component: Screen1WasherFunctionComponent;
  let fixture: ComponentFixture<Screen1WasherFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen1WasherFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen1WasherFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
