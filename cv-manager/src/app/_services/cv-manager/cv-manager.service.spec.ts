/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CvManagerService } from './cv-manager.service';

describe('Service: CvManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvManagerService]
    });
  });

  it('should ...', inject([CvManagerService], (service: CvManagerService) => {
    expect(service).toBeTruthy();
  }));
});
