import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from './models/message.model';
import { Thread } from './models/thread.model';
import { User } from './models/user.model';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishReplay';
// import {filter, scan, map, publishReplay} from 'rxjs/operators';
// import { filter } from 'rxjs/operator/filter';
// import 'rxjs/add/operator/refCount';
import { Observable } from 'rxjs/Observable';

type IMessagesOperation = (message: Message[]) => Message[];
// interface IMessagesOperation extends Function {
//   (message: Message[]): Message[];
// }

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();
  //
  // initialMessages = [
  //   new Message({ author: new User('Lice', ''), text: 'This is it', thread: new Thread('t0', 'Thread 0', ''), sentAt: new Date() }),
  //   new Message({ author: new User('Lice', ''), text: 'This is not it', thread: new Thread('t0', 'Thread 0', ''), sentAt: new Date()})
  // ];
  initialMessages = [];

  public addMessage(newMsg: Message) {
    this.newMessages.next(newMsg);
  }

  public messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((v: Message) => v.thread === thread && v.author !== user);
  }

  constructor() {
    this.messages = this.updates
      .scan((messages: Message[], operation: IMessagesOperation) => operation(messages),
        this.initialMessages)
      .publishReplay(1)
      .refCount();

    this.create
      .map((message: Message): IMessagesOperation => (messages: Message[]) => messages.concat(message))
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    this.markThreadAsRead
      .map((thread: Thread) => (messages: Message[]) =>
        messages.map((message: Message) => {
          if (message.thread && message.thread.id === thread.id) {
            message.isRead = true;
          }
          return message;
        })
      )
      .subscribe(this.updates);
  }

}

export const MessagesServiceInjectable: any[] = [
  { provide: MessagesService, useClass: MessagesService }
];
