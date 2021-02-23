import { TestBed } from '@angular/core/testing';

import { SerOnlineExamService } from './ser-online-exam.service';

describe('SerOnlineExamService', () => {
  let service: SerOnlineExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerOnlineExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
