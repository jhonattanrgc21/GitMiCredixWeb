import {Component, OnInit} from '@angular/core';
import {HomeNavigationMenuService} from '../home-navigation-menu.service';
import {ModalMessagesComponent} from './modal-messages/modal-messages.component';
import {Message} from '../../../../../shared/models/message';
import {HomeService} from '../../../home.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {GoHomeService} from '../../../../../core/services/go-home.service';

@Component({
  selector: 'app-menu-messages',
  templateUrl: './menu-messages.component.html',
  styleUrls: ['./menu-messages.component.scss']
})
export class MenuMessagesComponent implements OnInit {
  open = false;
  messages: Message[] = [];
  hasNewMessage = false;
  options = {autoHide: false, scrollbarMinSize: 100};

  constructor(private homeService: HomeService,
              private homeNavigationMenuService: HomeNavigationMenuService,
              private goHomeService: GoHomeService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getMessages();
    this.goHomeService.goHomeObs.subscribe(() => this.open = false);
    this.homeNavigationMenuService.closeMessagesObs.subscribe(() => this.open = false);
  }

  openMessages() {
    this.open = !this.open;
    this.homeNavigationMenuService.closeSubmenu();
  }

  getMessages() {
    this.homeService.getMessages().subscribe(response => {
      this.messages = response.map(message => ({
        id: message.id,
        previewImage: message.preview_image,
        image: message.image,
        title: message.title,
        text: message.text,
        status: message.status,
        sentDate: message.sent_date,
        creationDate: message.creation_date,
        expirationDate: message.expiration_date,
        readDate: message.read_date,
        type: message.type
      }));

      this.hasNewMessage = this.messages.find(messages => !messages.readDate) !== undefined;
    });
  }

  openMessagesModal(index: number) {
    const modal = this.modalService.open({
      component: ModalMessagesComponent, title: 'Mensajes', hideCloseButton: false,
      data: {messages: this.messages, messagesIndex: index}
    }, {
      width: 376,
      height: 586,
      disableClose: true,
      panelClass: 'messages-result-panel'
    }, 2);

    modal.afterClosed().subscribe(value => {
      this.hasNewMessage = this.messages.find(messages => !messages.readDate) !== undefined;
    });
  }
}
