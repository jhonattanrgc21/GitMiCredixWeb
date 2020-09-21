import {Component, OnInit} from '@angular/core';
import {LandingService} from './landing.service';
import {Movement} from '../../../../shared/models/Movement';
import {StorageService} from '../../../../core/services/storage.service';
import {AccountSummary} from '../../../../shared/models/account-summary';
import {GoHomeService} from '../../../../core/services/go-home.service';
import {ChannelsApiService} from '../../../../core/services/channels-api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  paymentDetails: PaymentDetails;
  accountSummary: AccountSummary;
  awards: Awards[] = [];
  movements: Movement[] = [];
  balancesTags = {
    creditLimitTag: 'Límite de crédito',
    consumedTag: 'Consumido',
    availableTag: 'Disponible',
    increaseCreditLimitTag: 'Aumentar límite',
    ibanAccountsTag: 'Cuentas IBAN',
    colonesTag: 'Colones',
    dollarsTag: 'Dólares',
    colonesIbanCopiedTag: 'Cuenta IBAN en colones copiada',
    dollarsIbanCopiedTag: 'Cuenta IBAN en dólares copiada',
  };
  paymentDetailsTags = {
    titleTag: 'Detalle de pago',
    cutOffTag: 'Corte',
    maxPaymentDateTag: 'Fecha máxima de pago',
    colonesTag: 'Colones',
    dollarsTag: 'Dólares',
    minTag: 'Mínimo',
    countedTag: 'Contado',
    todayTag: 'Hoy'
  };
  movementsTags = {
    titleTag: 'Movimientos'
  };
  cardId: number;

  constructor(private landingService: LandingService,
              private goHomeService: GoHomeService,
              private channelsApiService: ChannelsApiService,
              private storageService: StorageService) {
    this.goHomeService.goHome();
    this.cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal')?.cardId;
  }

  ngOnInit(): void {
    this.getHomeTags();
    this.getHomeContent();
    this.getAccountsSummary();
  }

  getHomeContent() {
    this.landingService.getHomeContent(this.cardId).subscribe(response => {
      if (response) {
        this.paymentDetails = {
          currentDate: response.fechaActual,
          nextCutOffDate: response.fechaProximaCorte,
          nextPaymentDate: response.fechaProximaMaximaPago,
          lastCutOffDate: response.ultimaFechaCorte,
          lastPaymentDate: response.ultimaFechaMaximaPago,
          minPaymentColones: response.pagoMinimoActColones,
          minPaymentDollars: response.pagoMinimoActDolares,
          cashPaymentColones: response.pagoContadoColones,
          cashPaymentDollars: response.pagoContadoDolares
        };

        this.movements = response.movements;

        if (response.listBanner) {
          response.listBanner.forEach(banner => {
            this.awards.push({
              title: banner.title,
              description: banner.description,
              img: banner.link
            });
          });
        }
      }
    });
  }

  getAccountsSummary() {
    this.channelsApiService.getAccountSummary(this.cardId).subscribe(accountSummary => this.accountSummary = accountSummary);
  }

  getHomeTags() {
    this.landingService.getHomeTags().subscribe(response => {
      if (response.type === 'success' && response.tagsHome?.tags.length > 0) {
        this.balancesTags = {
          creditLimitTag: response.tagsHome.tags.find(tag => tag.description === 'disponible.tag.limitecredito').value,
          consumedTag: response.tagsHome.tags.find(tag => tag.description === 'disponible.tag.consumido').value,
          availableTag: response.tagsHome.tags.find(tag => tag.description === 'disponible.tag.disponible').value,
          increaseCreditLimitTag: response.tagsHome.tags.find(tag => tag.description === 'disponible.link.aumentarlimitecredito').value,
          ibanAccountsTag: response.tagsHome.tags.find(tag => tag.description === 'pago.link.cuentasiban').value,
          colonesTag: response.tagsHome.tags.find(tag => tag.description === 'pago.table.header.colones').value,
          dollarsTag: response.tagsHome.tags.find(tag => tag.description === 'pago.table.header.dolares').value,
          colonesIbanCopiedTag: response.tagsHome.tags.find(tag => tag.description === 'pago.popup.message.success.copy').value,
          dollarsIbanCopiedTag: 'Cuenta IBAN dólares copiada'
        };

        this.paymentDetailsTags = {
          titleTag: response.tagsHome.tags.find(tag => tag.description === 'pago.table.header.detallepago').value,
          cutOffTag: response.tagsHome.tags.find(tag => tag.description === 'pago.barra.corte').value,
          maxPaymentDateTag: response.tagsHome.tags.find(tag => tag.description === 'pago.barra.maximapago').value,
          colonesTag: response.tagsHome.tags.find(tag => tag.description === 'pago.popup.tag.colones').value,
          dollarsTag: response.tagsHome.tags.find(tag => tag.description === 'pago.popup.tag.dolares').value,
          minTag: response.tagsHome.tags.find(tag => tag.description === 'pago.table.row.minimo').value,
          countedTag: response.tagsHome.tags.find(tag => tag.description === 'pago.table.row.contado').value,
          todayTag: response.tagsHome.tags.find(tag => tag.description === 'pago.barra.hoy').value
        };

        this.movementsTags = {
          titleTag: response.tagsHome.tags.find(tag => tag.description === 'movimientos.title.movimientos').value
        };
      }
    });
  }

  onCardChanged(cardId: number) {
    if (cardId !== this.cardId) {
      this.cardId = cardId;
      this.getHomeContent();
      this.getAccountsSummary();
    }
  }
}

export interface PaymentDetails {
  currentDate: string;
  nextCutOffDate: string;
  nextPaymentDate: string;
  lastCutOffDate: string;
  lastPaymentDate: string;
  minPaymentColones: string;
  minPaymentDollars: string;
  cashPaymentColones: string;
  cashPaymentDollars: string;
}

export interface Awards {
  title: string;
  description: string;
  img: string;
}
