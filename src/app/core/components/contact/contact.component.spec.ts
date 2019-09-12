import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactService } from '../../../services/contact/contact.service';
import { Mock } from 'ts-mocks';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {

    const mockContactService = new Mock<ContactService>();

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MaterialModule, RouterTestingModule ],
      declarations: [ ContactComponent ],
      providers: [
        { provide: ContactService, useValue: mockContactService.Object }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
