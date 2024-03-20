import { TestBed } from '@angular/core/testing';
import { ProjectGuard } from './project.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProjectGuard', () => {
  let guard: ProjectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectGuard]
    });
    guard = TestBed.inject(ProjectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
