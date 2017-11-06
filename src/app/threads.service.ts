import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Thread } from './models/thread.model';
import { MessagesService } from './messages.service';
import { Message } from './models/message.model';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/combineLatest';

@Injectable()
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;

  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Message[]>;

  constructor(private messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};
        messages.map((message: Message) => {
          if (message.thread) {
            threads[message.thread.id] = threads[message.thread.id] || message.thread;
            const messagesThread: Thread = threads[message.thread.id];
            if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
              messagesThread.lastMessage = message;
            }
          }
        });

        return threads;
      });

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        // console.log(threads);
        return threads.sort((a: Thread, b: Thread) => (a.lastMessage.sentAt > b.lastMessage.sentAt) ? 1 : -1).reverse();
      });

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);

    this.currentThreadMessages = this.currentThread
      .combineLatest(this.messagesService.messages,
        (currentThread: Thread, messages: Message[]) => {
          if (currentThread && messages.length > 0) {
            return messages
              .filter((message: Message) => message.thread.id === currentThread.id)
              .map((message: Message) => {
                message.isRead = true;
                return message;
              });
          } else {
            return [];
          }
        }
      );

  }


  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}


export const ThreadsServicesInjectable: any[] = [
  ThreadsService
];
