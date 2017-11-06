import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { MessagesService } from '../messages.service';
import { ThreadsService } from '../threads.service';
import { UsersService } from '../users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;

  me: boolean;
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.currentUser
      .subscribe((newUSer: User) => this.me = this.message.author.id === newUSer.id);
  }

}
