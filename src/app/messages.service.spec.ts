import { inject, TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { User } from './models/user.model';
import { Thread } from './models/thread.model';
import { Message } from './models/message.model';

describe('MessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesService]
    });
  });

  it('should be correctly injected', inject([MessagesService], (service: MessagesService) => {
    expect(service).toBeTruthy();
  }));


  it('should handle correctly a new Message belonging to a new Thread', () => {

    const user: User = new User('Nate', '');
    const thread: Thread = new Thread('t1', 'Nate', '');
    const m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    const m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread
    });

    const messagesService: MessagesService = new MessagesService();

    messagesService.newMessages
      .subscribe( (message: Message) =>  console.log(`=> newMessages:  ${message.text}`) );

    messagesService.messages
      .subscribe( (messages: Message[]) => console.log(`=> messages: ${messages.length}`) );


    messagesService.addMessage(m1);
    messagesService.addMessage(m2);

  });

});


