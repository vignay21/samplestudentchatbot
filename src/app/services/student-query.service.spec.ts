import { TestBed } from '@angular/core/testing';

import { StudentQueryService } from './student-query.service';

describe('StudentQueryService', () => {
  let service: StudentQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
