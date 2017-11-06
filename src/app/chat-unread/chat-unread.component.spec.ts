import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUnreadComponent } from './chat-unread.component';

describe('ChatUnreadComponent', () => {
  let component: ChatUnreadComponent;
  let fixture: ComponentFixture<ChatUnreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUnreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUnreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
