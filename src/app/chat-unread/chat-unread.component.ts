import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../models/message.model';
import { ThreadsService } from '../threads.service';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-chat-unread',
  templateUrl: './chat-unread.component.html',
  styleUrls: ['./chat-unread.component.css']
})
export class ChatUnreadComponent implements OnInit {
  public unreadMessagesCount: number;

  constructor(private messagesService: MessagesService,
              private threadsService: ThreadsService) {
  }

  ngOnInit() {
    this.messagesService.messages
      .combineLatest(this.threadsService.currentThread, (messages: Message[], currentThread: Thread) => [messages, currentThread])
      .subscribe(
        ([listOfMessages, currentThread]: [Message[], Thread]) => {
        this.unreadMessagesCount = listOfMessages.reduce((sum, currentMessage: Message) => {
          sum += (currentMessage.isRead === false && currentMessage.thread.id !== currentThread.id ) ? 1 : 0;
          return sum;
        }, 0);
      });
  }
}
