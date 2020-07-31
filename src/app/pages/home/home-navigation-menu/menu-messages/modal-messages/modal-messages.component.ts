import {AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Message} from '../../../../../shared/models/Message';

@Component({
  selector: 'app-modal-messages',
  templateUrl: './modal-messages.component.html',
  styleUrls: ['./modal-messages.component.scss']
})
export class ModalMessagesComponent implements OnInit, AfterViewInit {
  @ViewChild('footer') footer: TemplateRef<any>;
  currentMessage: number;
  messagesLength = 0;
  message: Message;

  constructor(public dialogRef: MatDialogRef<ModalMessagesComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.currentMessage = this.data.data.messagesIndex;
    this.messagesLength = this.data.data.messages.length;
    this.message = this.data.data.messages[this.currentMessage];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data.footer = this.footer;
  }

  back() {
    this.currentMessage = this.currentMessage - 1;
    this.message = this.data.data.messages[this.currentMessage];
  }

  next() {
    this.currentMessage = this.currentMessage + 1;
    this.message = this.data.data.messages[this.currentMessage];
  }

}
