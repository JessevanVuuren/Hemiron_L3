import { TestBed } from '@angular/core/testing';

import { PostgresService } from './postgres.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PostgresService', () => {
  let service: PostgresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostgresService]
    });
    service = TestBed.inject(PostgresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
