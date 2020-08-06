import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../core/services/modal.service';
import {ModalAwardsComponent} from './modal-awards/modal-awards.component';
import {StorageService} from '../../../../core/services/storage.service';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  tabs = [
    {id: 1, name: 'En progreso'},
    {id: 2, name: 'Finalizados'},
  ];
  showInProgress = true;
  completed = [];
  inProgress = [];
  awards = [];
  options = {autoHide: false, scrollbarMinSize: 100};

  constructor(
    private modalService: ModalService,
    private storageService: StorageService,
    private httpServide: HttpService
  ) {
  }

  ngOnInit(): void {
    this.getUserChallenges();
  }

  tabSelected(tab) {
    this.showInProgress = tab.id === 1;
    this.awards = this.showInProgress ? this.inProgress : this.completed;
  }

  open(i, modal: 'in-progress' | 'completed') {
    switch (modal) {
      case 'completed':
        this.modalService.open({
          component: ModalAwardsComponent, title: 'Premios',
          data: {modal, id: i, array: this.completed}
        }, {
          width: 376,
          height: 586,
          disableClose: true,
          panelClass: 'awards-result-panel'
        }, 2);
        break;
      case 'in-progress':
        this.modalService.open({
          component: ModalAwardsComponent, title: 'Premios',
          data: {modal, id: i, array: this.inProgress}
        }, {
          width: 376,
          height: 586,
          disableClose: true,
          panelClass: 'awards-result-panel'
        }, 2);
        break;
    }
  }

  getUserChallenges() {
    const sibUserId = this.storageService.getCurrentUser().userId;
    this.httpServide
      .post('canales', `messagesrewards/challenges/user/${sibUserId}`, {
        channelId: 102,
        usuId: sibUserId,
      })
      .pipe(map(response => {
        return response.json;
      }))
      .subscribe((response) => {
        console.log(response);
        response.forEach((award) => {
          if (award.completed) {
            this.completed.push(award);
          } else {
            this.inProgress.push(award);
          }
        });

        this.awards = this.inProgress;
      });
  }

}
