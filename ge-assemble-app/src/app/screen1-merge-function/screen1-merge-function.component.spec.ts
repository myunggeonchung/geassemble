import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen1MergeFunctionComponent } from './screen1-merge-function.component';

describe('Screen1MergeFunctionComponent', () => {
  let component: Screen1MergeFunctionComponent;
  let fixture: ComponentFixture<Screen1MergeFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen1MergeFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen1MergeFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
