import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SharedModule } from '../shared/shared.module';
import { ChatService } from './services/chat.service';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    ChatRoomComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    ChatService,
  ]
})
export class ChatModule { }
