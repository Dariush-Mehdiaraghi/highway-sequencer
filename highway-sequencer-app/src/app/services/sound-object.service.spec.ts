import { TestBed } from '@angular/core/testing';

import { SoundObjectService } from './sound-object.service';

describe('SoundObjectPositionsService', () => {
  let service: SoundObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
