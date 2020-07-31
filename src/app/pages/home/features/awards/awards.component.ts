import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import {ModalAwardsComponent} from './modal-awards/modal-awards.component';
import {StorageService} from '../../../../core/services/storage.service';
import {HttpService} from '../../../../core/services/http.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  tabs = [
    { id: 1, name: 'En progreso' },
    { id: 2, name: 'Finalizados' },
  ];
  tab_show = 1;
  userChallenges;

  constructor(private modalService: ModalService,  private storageService: StorageService, private httpServide: HttpService) { }


  ngOnInit(): void {

    this.userChallenges = this.getUserChallenges();
    console.log(this.userChallenges);
  }

  tabSelected(tab) {
    if (tab.id == 1) {
      this.tab_show = 1
    } else {
      this.tab_show = 0
    }
  }

  open(){
    this.modalService.open({ component: ModalAwardsComponent, title: 'Premios' },
      { width: 376, height: 584, disableClose: true });
  }

  getUserChallenges(){
    const sibUserId = this.storageService.getCurrentUser().userId;

    this.httpServide.post('canales', `api/canalesbe/messagesrewards/challenges/user/${sibUserId}`, {"channelId":102, "usuId": sibUserId})
    .subscribe((resp)=>{

    })

  }

}
