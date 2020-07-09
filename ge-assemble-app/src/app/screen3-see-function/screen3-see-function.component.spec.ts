import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen3SeeFunctionComponent } from './screen3-see-function.component';

describe('Screen3SeeFunctionComponent', () => {
  let component: Screen3SeeFunctionComponent;
  let fixture: ComponentFixture<Screen3SeeFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen3SeeFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen3SeeFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
