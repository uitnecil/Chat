import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../threads.service';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

  threads: Observable<Thread[]>;
  constructor(public threadsService: ThreadsService) {
    this.threads = this.threadsService.orderedThreads;
  }

  ngOnInit() {
  }

}
