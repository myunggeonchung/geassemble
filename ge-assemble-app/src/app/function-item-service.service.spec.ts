import { TestBed } from '@angular/core/testing';

import { FunctionItemServiceService } from './function-item-service.service';

describe('FunctionItemServiceService', () => {
  let service: FunctionItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
