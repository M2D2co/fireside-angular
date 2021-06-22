import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Chat } from '../chat.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  readonly searchForm: FormGroup;

  chats: Observable<Chat[]>;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  search() {
    const search = this.searchForm.controls.search.value;

    if (!search) {
      return;
    }

    this.chats = this.chatService.search(search);
  }

}
