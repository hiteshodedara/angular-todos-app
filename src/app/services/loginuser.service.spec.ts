import { TestBed } from '@angular/core/testing';

import { LoginuserService } from './loginuser.service';

describe('LoginuserService', () => {
  let service: LoginuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
