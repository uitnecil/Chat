import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { MessagesService } from '../messages.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  user: User;
  msg: Message;

  constructor(public messagesServ: MessagesService) {
    this.user = new User('Licentiu', '../../../assets/images/avatars/male-avatar-1.png');
    console.log(this.user);
    this.msg = new Message({ text: 'This is it!' });
    console.log(this.msg);

    this.messagesServ.messages.subscribe(console.log);

    this.messagesServ.addMessage(new Message({ message: 'this is it' }));


    // Observable.from([1, 2, 3, 4, 5])
    //   .subscribe(console.log);
    //
    // Observable.of(...[1, 2, 3, 4, 5])
    //   .subscribe(console.log);
  }

  ngOnInit() {
  }

}
