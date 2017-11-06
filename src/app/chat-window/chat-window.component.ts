import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Thread } from '../models/thread.model';
import { UsersService } from '../users.service';
import { ThreadsService } from '../threads.service';
import { MessagesService } from '../messages.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public UsersService: UsersService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.UsersService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    if (this.draftMessage.text) {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
    }
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }


  ngAfterViewInit() {
    // console.log(this.chatWindow);
    // const mouseDown$ = Observable.fromEvent(this.chatWindow.nativeElement, 'mousedown');
    // const mouseUp$ = Observable.fromEvent(document, 'mouseup');
    // const mouseMove$ = Observable.fromEvent(document, 'mousemove');
    //
    // const dragNDrop$ = mouseDown$
    //   .mergeMap(() => mouseMove$.takeUntil(mouseUp$));
    //
    // this.subscription = dragNDrop$
    //   .subscribe(
    //     (event: MouseEvent) => {
    //       console.log(event);
    //       // this.chatWindow.nativeElement.style.left = event.clientX + 'px';
    //       this.left = event.clientX;
    //       this.top = event.clientY;
    //       // this.chatWindow.nativeElement.style.top = event.clientY + 'px';
    //     },
    //     console.log,
    //     () => console.log('completed')
    //   );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }




}
