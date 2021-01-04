import {Component, OnDestroy, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {PaymentPlacesService} from './payment-places.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-payment-places',
  templateUrl: './payment-places.component.html',
  styleUrls: ['./payment-places.component.scss']
})
export class PaymentPlacesComponent implements OnInit, OnDestroy {
  tabs = [
    {id: 1, name: 'Pagos digitales'},
    {id: 2, name: 'Comercios'},
  ];
  titleTag: string;

  constructor(private paymentPlacesService: PaymentPlacesService,
              private toastService: CredixToastService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Lugares de pago').tags)
    );
  }

  tabSelected(tab) {
    this.router.navigate([tab.id === 1 ? 'home/payment-places/digital-payments' : 'home/payment-places/shops']);
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'lugares.title')?.value;
    this.tabs = [
      {id: 1, name: tags.find(tag => tag.description === 'lugares.tab2')?.value || 'Pagos digitales'},
      {id: 2, name: tags.find(tag => tag.description === 'lugares.tab1')?.value || 'Comercios'}
    ];
  }

  ngOnDestroy(): void {
    this.paymentPlacesService.unsubscribe();
  }
}
