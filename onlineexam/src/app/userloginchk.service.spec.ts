import { TestBed } from '@angular/core/testing';

import { UserloginchkService } from './userloginchk.service';

describe('UserloginchkService', () => {
  let service: UserloginchkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserloginchkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
