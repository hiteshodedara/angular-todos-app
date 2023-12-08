import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginpageguardGuard } from './loginpageguard.guard';

describe('loginpageguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginpageguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
