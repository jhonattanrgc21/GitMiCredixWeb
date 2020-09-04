import {Component, OnInit} from '@angular/core';
import {AdditionalCardsManagementService} from '../additional-cards-management.service';
import {Router} from '@angular/router';
import {AdditionalCard} from '../../../../../shared/models/additional-card';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';

@Component({
  selector: 'app-additional-cards',
  templateUrl: './additional-cards.component.html',
  styleUrls: ['./additional-cards.component.scss']
})
export class AdditionalCardsComponent implements OnInit {
  additionalCards: AdditionalCard[] = [];

  constructor(private additionalCardsService: AdditionalCardsManagementService,
              private globalRequestsService: GlobalRequestsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.globalRequestsService.getAdditionalCards().subscribe(additionalCards => this.additionalCards = additionalCards);
  }

  goToNewAdditionalCard() {
    this.router.navigate(['/home/additional-cards-management/new-card']);
  }

  deleteAdditionalCard() {

  }
}
