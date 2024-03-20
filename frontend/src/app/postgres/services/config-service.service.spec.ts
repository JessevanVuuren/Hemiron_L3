import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ConfigServiceService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
