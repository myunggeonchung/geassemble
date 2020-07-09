import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen2ReadFunctionComponent } from './screen2-read-function.component';

describe('Screen2ReadFunctionComponent', () => {
  let component: Screen2ReadFunctionComponent;
  let fixture: ComponentFixture<Screen2ReadFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen2ReadFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen2ReadFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
