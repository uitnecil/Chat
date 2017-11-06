import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  @ViewChild('chatWindow', { read: ElementRef }) public chatWindow: ElementRef;

  public checkboxStatus = true;
  public dragging = false;

  constructor() {

  }

  ngOnInit() {
  }

  logMe(coordinates: { x: number, y: number }) {
    console.log('outside of directive', coordinates);
  }


  processStatus(status: string) {
    // console.log('outside of directive', status);
  }

  doIt(status: MatSlideToggleChange) {
    this.checkboxStatus = status.checked;
    console.log('event', status, 'this.checkboxStatus', this.checkboxStatus);
  }
}
