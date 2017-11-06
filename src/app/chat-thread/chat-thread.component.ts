import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '../models/thread.model';
import { ThreadsService } from '../threads.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() public thread: Thread;
  selected = false;

  constructor(public threadsServices: ThreadsService) {

  }

  ngOnInit() {
    this.threadsServices.currentThread
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread && this.thread && (currentThread.id === this.thread.id);
      });
  }

  click( event: MouseEvent) {
    this.threadsServices.setCurrentThread(this.thread);
    event.preventDefault();
  }

  /*
    // USING CURRIED FUNCTION

    // import * as R from 'ramda';
    // option 1 - NO CURRYING
    const base1 = 10;
    Observable.from([1, 2, 3, 4, 5])
      .map(x => x + base1)
      .subscribe(res => console.log('normal: ', res));


    // option 2 - CURRYING
    const base2 = 10;

    // let's assume this is a more complex function that is widely used and cannot be changed
    const doSum = (x: number, y: number): number => x + y;
    const doSumCurried = R.curry(doSum);

    Observable.from([1, 2, 3, 4, 5])
    // makes use of automatic passing of parameters
      .map(doSumCurried(R.__)(base2))
      // .map(x => doSum(x, base2))
      .subscribe(res => console.log('sample curried: ', res));
*/

}
