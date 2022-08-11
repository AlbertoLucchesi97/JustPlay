import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { VideogamesDataService } from './videogame-data.service';

describe('VideogameDataService', () => {
  let service: VideogamesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogamesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
