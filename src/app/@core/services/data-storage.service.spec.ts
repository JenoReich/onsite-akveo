import { TestBed } from '@angular/core/testing';

import { CentralDataStorageService } from './central-data-storage.service';

describe('DataStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentralDataStorageService = TestBed.get(CentralDataStorageService);
    expect(service).toBeTruthy();
  });
});
