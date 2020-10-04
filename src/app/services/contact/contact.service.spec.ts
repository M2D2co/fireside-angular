import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Mock } from 'ts-mocks';
import { of } from 'rxjs';

const list = {
  valueChanges: of([]),
  snapshotChanges: of([]),
  stateChanges: of([]),
  update: new Promise(resolve => [])
} as any as AngularFireList<any>;

const object = {
  valueChanges: of({}),
  snapshotChanges: of({}),
  stateChanges: of({}),
  update: new Promise(resolve => {})
} as any as AngularFireObject<any>;

describe('ContactService', () => {
  beforeEach(() => {
    const mockAngularFireDatabase = new Mock<AngularFireDatabase>();
    mockAngularFireDatabase.setup(o => o.object).is(() => object);
    mockAngularFireDatabase.setup(o => o.list).is(() => list);
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase.Object },
      ]
    });
  });

  it('should be created', () => {
    const service: ContactService = TestBed.inject(ContactService);
    expect(service).toBeTruthy();
  });
});
