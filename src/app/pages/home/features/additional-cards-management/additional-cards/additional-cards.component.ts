import {Component, OnInit} from '@angular/core';
import {AdditionalCardsManagementService} from '../additional-cards-management.service';
import {Router} from '@angular/router';
import {AdditionalCard} from '../../../../../shared/models/additional-card';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {finalize} from 'rxjs/operators';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {ChannelsApiService} from '../../../../../core/services/channels-api.service';

@Component({
  selector: 'app-additional-cards',
  templateUrl: './additional-cards.component.html',
  styleUrls: ['./additional-cards.component.scss']
})
export class AdditionalCardsComponent implements OnInit {
  additionalCards: AdditionalCard[] = [];
  cardId = -999;
  creditLimit = 0;
  titleTag: string;
  limitTag: string;

  constructor(private additionalCardsManagementService: AdditionalCardsManagementService,
              private channelsApiService: ChannelsApiService,
              private toastService: CredixToastService,
              private modalService: ModalService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.channelsApiService.getAdditionalCards().subscribe(additionalCards => this.additionalCards = additionalCards);
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Tarjetas adicionales').tags));
  }

  goToNewAdditionalCard() {
    this.router.navigate(['/home/additional-cards-management/new-card']);
  }

  setCredit(creditLimit: number, additionalCard: AdditionalCard) {
    this.creditLimit = creditLimit;
    this.cardId = additionalCard.cardId;
  }

  setNewCreditLimit() {
    this.additionalCardsManagementService.setCreditLimit(this.cardId, this.creditLimit).subscribe(response => {
      this.toastService.show({text: response.descriptionOne, type: response.titleOne});
      this.cardId = -999;
    });
  }

  openConfirmModal(cardId: number) {
    this.modalService.confirmationPopup('¿Está seguro que desea desactivar la tarjeta adicional?').subscribe(response => {
      if (response) {
        this.deleteAdditionalCard(cardId);
      }
    });
  }

  deleteAdditionalCard(cardId: number) {
    this.additionalCardsManagementService.disableAdditionalCard(cardId)
      .pipe(finalize(() =>
        this.channelsApiService.getAdditionalCards().subscribe(additionalCards => this.additionalCards = additionalCards)))
      .subscribe(response => {
        this.toastService.show({text: response.descriptionOne, type: response.titleOne});
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'adicionales.title').value;
    this.limitTag = tags.find(tag => tag.description === 'adicionales.tagLimite').value;
  }
}
