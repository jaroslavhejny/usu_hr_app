import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  get msgList ():string[] {
    let list = this.messageService.messages;
    if (list.length > 3){
      return list.splice(0, list.length-3);
    }

    else {
      return list
    }
  }

  removeMsg(index){
    this.msgList.splice(index, 1);
  }
}
