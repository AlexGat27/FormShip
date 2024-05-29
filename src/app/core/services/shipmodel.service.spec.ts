import { TestBed } from '@angular/core/testing';

import { ShipmodelService } from './shipmodel.service';

describe('ShipmodelService', () => {
  let service: ShipmodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
