import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailRegex } from '../../../services/helper/helper.service';
import { ContactService } from '../../../services/contact/contact.service';

@Component({
  selector: 'starter-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: FormGroup;
  showForm = true;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.contact = this.fb.group({
      name: ['', Validators.maxLength(50) ],
      email: ['', [ Validators.required, Validators.maxLength(60), Validators.pattern(EmailRegex) ]],
      phone: ['', Validators.maxLength(25) ],
      message: ['', [ Validators.required, Validators.maxLength(2000) ]]
    });
  }

  sendMessage() {
    const honeyPot = document.getElementById('email').nodeValue;
    const payload = this.contact.value;
    if (!honeyPot) {
      this.contactService.sendMessage(payload);
    }
    this.contact.get('message').reset();
    this.showForm = false;
  }

  isInvalid(formControlName: string) {
    return this.contact.get(formControlName).invalid && this.contact.get(formControlName).touched;
  }

}
