import {AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Message} from '../../../../../../shared/models/Message';
import {HomeService} from '../../../../home.service';

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

  constructor(public dialogRef: MatDialogRef<ModalMessagesComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private homeService: HomeService) {
    this.currentMessage = this.data.data.messagesIndex;
    this.messagesLength = this.data.data.messages.length;
    this.message = this.data.data.messages[this.currentMessage];
  }

  ngOnInit(): void {
    this.markAsRead();
  }

  ngAfterViewInit(): void {
    this.data.footer = this.footer;
  }

  markAsRead() {
    if (!this.message.readDate && !this.message.read) {
      this.homeService.markMessageRead(this.message.id).subscribe(response => {
        this.message.read = response.read;
        this.message.readDate = response.readDate;
      });
    }
  }

  back() {
    this.currentMessage = this.currentMessage - 1;
    this.message = this.data.data.messages[this.currentMessage];
    this.markAsRead();
  }

  next() {
    this.currentMessage = this.currentMessage + 1;
    this.message = this.data.data.messages[this.currentMessage];
    this.markAsRead();
  }

}
