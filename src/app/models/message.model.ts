import { uuid } from '../util/uuid';
import { User } from './user.model';
import { Thread } from './thread.model';

export class Message {
  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id = obj && obj.id || uuid();
    this.sentAt = obj && obj.sentAt || new Date();
    this.isRead = obj && obj.isRead || false;
    this.author = obj && obj.author || null;
    this.text = obj && obj.text || null;
    this.thread = obj && obj.thread || null;
  }
}
