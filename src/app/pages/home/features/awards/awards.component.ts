import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../core/services/modal.service';
import {StorageService} from '../../../../core/services/storage.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {Challenge} from '../../../../shared/models/challenge';
import {AwardsService} from './awards.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  tabs = [
    {id: 1, name: 'En progreso'},
    {id: 2, name: 'Finalizados'}
  ];
  tabId = 1;
  completedChallenges: Challenge[] = [];
  inProgressChallenges: Challenge[] = [];
  challenges: Challenge[] = [];
  options = {autoHide: false, scrollbarMinSize: 100};
  titleTag: string;
  descriptionTag: string;
  linkTag: string;
  warningOneTag: string;
  warningTwoTag: string;

  constructor(private modalService: ModalService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private awardsService: AwardsService) {
  }

  ngOnInit(): void {
    this.getUserChallenges();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Premios').tags));
  }

  tabSelected(tab) {
    this.tabId = tab.id;
    this.challenges = this.tabId === 1 ? this.inProgressChallenges : this.completedChallenges;
  }

  open(challenge: Challenge) {
    /* switch (modal) {
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
     }*/
  }

  getUserChallenges() {
    this.awardsService.getChallenges().subscribe(challenges => {
      challenges.forEach((challenge) => {
        if (challenge.completed) {
          this.completedChallenges.push(challenge);
        } else {
          this.inProgressChallenges.push(challenge);
        }
      });
      this.challenges = this.inProgressChallenges;
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
