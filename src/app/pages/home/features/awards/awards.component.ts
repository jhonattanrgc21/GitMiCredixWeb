import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../core/services/modal.service';
import {ModalAwardsComponent} from './modal-awards/modal-awards.component';
import {StorageService} from '../../../../core/services/storage.service';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

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
  titleTag: string;
  descriptionTag: string;
  linkTag: string;
  warningOneTag: string;
  warningTwoTag: string;

  constructor(private modalService: ModalService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getUserChallenges();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Premios').tags));
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
    this.httpService
      .post('canales', `messagesrewards/challenges/user/${sibUserId}`, {
        channelId: 102,
        usuId: sibUserId,
      })
      .pipe(map(response => {
        return response.json;
      }))
      .subscribe((response) => {
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

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'premios.help.title').value;
    this.descriptionTag = tags.find(tag => tag.description === 'premios.help.description').value;
    this.linkTag = tags.find(tag => tag.description === 'premios.link').value;
    this.warningOneTag = tags.find(tag => tag.description === 'premios.message.warning.tab1').value;
    this.warningTwoTag = tags.find(tag => tag.description === 'premios.message.warning.tab2').value;
    this.tabs = [
      {id: 1, name: tags.find(tag => tag.description === 'premios.tab1').value || 'En progreso'},
      {id: 2, name: tags.find(tag => tag.description === 'premios.tab2').value || 'Finalizados'},
    ];
  }
}
