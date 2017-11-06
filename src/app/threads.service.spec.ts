import { TestBed, inject } from '@angular/core/testing';

import { ThreadsService } from './threads.service';
import { User } from './models/user.model';
import { Thread } from './models/thread.model';
import { Message } from './models/message.model';
import { MessagesService } from './messages.service';
import 'rxjs/add/operator/pluck';

describe('ThreadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreadsService, MessagesService]
    });
  });

  it('should be correctly injected', inject([ThreadsService], (service: ThreadsService) => {
    expect(service).toBeTruthy();
  }));

  it('should collect the threads from messages', () => {

    const nate: User = new User('Nate Murray', '');
    const felipe: User = new User('Felipe Coury', '');

    const thread1: Thread = new Thread('t1', 'Thread 1', '');
    const thread2: Thread = new Thread('t2', 'Thread 2', '');

    const m1: Message = new Message({
      author: nate,
      text: 'Hi!',
      thread: thread1
    });
    const m2: Message = new Message({
      author: felipe,
      text: 'Where did you get that hat?',
      thread: thread1
    });
    const m3: Message = new Message({
      author: nate,
      text: 'Did you get your briefcase?',
      thread: thread2
    });

    const messageService: MessagesService = new MessagesService();
    const threadsService: ThreadsService = new ThreadsService(messageService);

    threadsService.threads
      .subscribe(console.log);

    threadsService.orderedThreads
      .subscribe(x => console.log('ordered threads: ', x));

    messageService.addMessage(m1);
    messageService.addMessage(m2);
    messageService.addMessage(m3);

  });
});
