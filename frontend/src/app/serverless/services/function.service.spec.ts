import { TestBed } from '@angular/core/testing';

import { FunctionService } from './function.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FunctionService', () => {
  let service: FunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [FunctionService]
    });
    service = TestBed.inject(FunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
