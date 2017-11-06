import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TestingComponent } from './testing/testing.component';
import { UsersServiceInject } from './users.service';
import { MessagesServiceInjectable } from './messages.service';
import { ThreadsServicesInjectable } from './threads.service';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MoveMeDirective } from './move-me.directive';
import { ChatUnreadComponent } from './chat-unread/chat-unread.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    ChatPageComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    MoveMeDirective,
    ChatUnreadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [UsersServiceInject, MessagesServiceInjectable, ThreadsServicesInjectable],
  bootstrap: [AppComponent]
})
export class AppModule {
}
