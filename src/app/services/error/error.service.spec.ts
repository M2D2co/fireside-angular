import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { Angulartics2 } from 'angulartics2';
import { Mock } from 'ts-mocks';
import { Subject, ReplaySubject } from 'rxjs';

describe('ErrorService', () => {
  const eventTrackSubject = new ReplaySubject();
  const eventExceptionTrackSubject = new ReplaySubject();
  const mockAngulartics2 = new Mock<Angulartics2>();


  beforeEach(() => {
    mockAngulartics2.setup(o => o.eventTrack).is(eventTrackSubject);
    mockAngulartics2.setup(o => o.eventTrack).is(eventExceptionTrackSubject);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ErrorService,
        { provide: Angulartics2, useValue: mockAngulartics2.Object }
      ]
    });
  });

  it('should be created', () => {
    const service: ErrorService = TestBed.inject(ErrorService);
    expect(service).toBeTruthy();
  });
});
