import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen1AddFunctionComponent } from './screen1-add-function.component';

describe('Screen1AddFunctionComponent', () => {
  let component: Screen1AddFunctionComponent;
  let fixture: ComponentFixture<Screen1AddFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen1AddFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen1AddFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
