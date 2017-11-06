import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor() { }
  public setCurrentUser(newUser: User) {
    this.currentUser.next(newUser);
  }
}


export const UsersServiceInject: any[] = [
  {provide: UsersService, useClass: UsersService}
] ;
