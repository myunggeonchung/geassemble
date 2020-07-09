import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountSnackBarComponent } from './count-snack-bar.component';

describe('CountSnackBarComponent', () => {
  let component: CountSnackBarComponent;
  let fixture: ComponentFixture<CountSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
