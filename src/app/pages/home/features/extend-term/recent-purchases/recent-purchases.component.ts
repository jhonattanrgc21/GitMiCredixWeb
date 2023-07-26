import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from '../../../../../core/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../core/services/storage.service';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {ExtendTermQuota} from '../../../../../shared/models/extend-term-quota';
import {AllowedMovement} from '../../../../../shared/models/allowed-movement';
import {ExtendTermService} from '../extend-term.service';
import { CredixSliderComponent } from 'src/app/shared/components/credix-slider/credix-slider.component';
import { ConvertNumberToStringAmount } from 'src/app/shared/utils/convert-number-to-string-amount';

@Component({
  selector: 'app-recent-purchases',
  templateUrl: './recent-purchases.component.html',
  styleUrls: ['./recent-purchases.component.scss']
})
export class RecentPurchasesComponent implements OnInit, OnDestroy {

  tableHeaders = [
    {label: 'Consumos', width: '282px'},
    {label: 'Ampliación', width: 'auto'}
  ];
  allowedMovementSelected: AllowedMovement;
  allowedMovements: AllowedMovement[] = [];
  promo = true;
  promoMessage = 'Traslade una compra a \n' +
    '3 cuotas cero interés sin comisión';
  promoDescription = '¡Aproveche! Del 02/06/23 al 08/07/23 puede cambiar el plazo de un consumo a 3 cuotas cero interés sin ningún costo.';
  quotaAmountFromSelected: number;
  movementIdParam: string;
  quotas: ExtendTermQuota[];
  quotaSelected: ExtendTermQuota;
  message = 'El plazo de su compra ha sido extendido correctamente.';
  status: 'success' | 'error';
  done = false;
  empty = false;
  quotaSliderStep = 1;
  quotaSliderMin = 3;
  quotaSliderMax = 12;
  quotaSliderDisplayMin = 1;
  quotaSliderDisplayMax = 12;
  quotaSliderDisplayValue = 0;
  today: Date;
  comisionTag: string;
  subtitle: string;
  question: string;
  titleTag: string;
  disclaTag: string;
  monthTag: string;
  warningTag: string;
  dateTag: string;
  quotaTag: string;
  deseoTag: string;
  newQuota: string;
  resultNew: string;
  title: string;
  iva: number;
  percentageCommission: string;
  feedPercentage: any;
  comissionUnique: boolean = false;
  private promoMessages: string[] = [
    'Descuento: 50%',
    '¡Sin comisión!',
    'Descuento: 25%',
    '¡Totalmente Gratis!',
  ];
  private promosFreeCommission: boolean[] = [
    false,
    true,
    false,
    true,
  ];
  private promosDiscountCommission: boolean[] = [
    true,
    false,
    true,
    false,
  ];
  private promosAmountCommission: number[] = [
    0.50,
    0.0,
    0.25,
    0.0,
  ];
  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;
  template: TemplateRef<any>;
  @ViewChild(CredixSliderComponent) credixSlider: CredixSliderComponent;

  constructor(private extendTermService: ExtendTermService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.checkCutDate();
    this.movementIdParam = this.route.snapshot.params?.movementId;
    this.getAllowedMovements();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
  }

  checkCutDate() {
    this.extendTermService.checkCutDate().subscribe(response => {
      if (!response.status) {
        this.message = response.descriptionOne;
        this.title = response.titleOne;
        this.done = true;
        this.template = this.disabledTemplate;
      }
    });
  }

  getAllowedMovementDetail(movement: AllowedMovement) {
    this.allowedMovementSelected = movement;
    this.quotaAmountFromSelected = ConvertStringAmountToNumber(movement.originAmount) / movement.totalPlanQuota;
    this.calculateQuota(movement.movementId);
  }

  convertAmountValue(value: any): any {
    let result: any = '';

    if ( typeof value === "number" )  {
      result =  ConvertNumberToStringAmount(value);
    } else {
      result = ConvertStringAmountToNumber(value);
    }

    return result;
  }

  getQuota(sliderValue) {
    this.quotaSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.quotaSelected = this.quotas[sliderValue - 1];
    console.log("quota: ", this.quotaSelected);
    this.feedPercentage = this.quotaSelected?.feePercentage === 0 ?
      this.quotaSelected?.feePercentage : this.convertAmountValue(this.quotaSelected?.feePercentage);

    this.iva = this.quotaSelected.quotaTo === 1 ?
      ConvertStringAmountToNumber(this.quotas[1].commissionAmount) * 0.13 : ConvertStringAmountToNumber(this.quotaSelected.IVA);
    if (!this.comissionUnique) {
      this.percentageCommission = this.convertAmountValue(this.quotaSelected?.commissionPercentage);
    }
  }

  getAllowedMovements() {
    this.extendTermService.getAllowedMovements( 1004 )
      .pipe(finalize(() => this.checkMovementParam()))
      .subscribe(response => {
        if ( response?.result ) {
          this.empty = false;
          this.allowedMovements = response.result.map((values, index) => {
            return {
              originAmount: values.originAmount,
              originCurrency: values.originCurrency,
              establishmentName: values.establishmentName,
              cardId: values.cardId,
              totalPlanQuota: values.totalPlanQuota,
              accountNumber: values.accountNumber,
              movementId: values.movementId,
              originDate: values.originDate,
              promoApply: (index < 4),
              promoMessage: (index < 4) ? this.promoMessages[index] : null,
              promoFreeCommission: (index < 4) ? this.promosFreeCommission[index] : null,
              promoDiscountCommission: (index < 4) ? this.promosDiscountCommission[index] : null,
              discountCommissionAmount: (index < 4) ? this.promosAmountCommission[index] : null
            };
          });
        } else {
          this.empty = true;
        }
      });
  }

  checkMovementParam() {
    if (this.movementIdParam) {
      this.getAllowedMovementDetail(this.allowedMovements
        .find(allowedMovement => allowedMovement.movementId === this.movementIdParam));
    }
  }

  calculateQuota(movementId: string) {
    this.extendTermService.calculateQuotaByMovement(movementId, 1004)
      .pipe(finalize(() => this.initSlider()))
      .subscribe(extendTermQuotas => {
        this.quotas = extendTermQuotas;
      });
  }

  initSlider() {
    this.credixSlider.value = 1;
    this.quotaSliderStep = 1;
    this.quotaSliderDisplayMin = this.quotas[0].quotaTo;
    this.quotaSliderMin = 1;
    this.quotaSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
    this.quotaSliderMax = this.quotas.length;
    this.quotaSliderDisplayValue = this.quotaSliderDisplayMin;

    const quota = this.quotas.find(q => q.quotaTo === this.allowedMovementSelected.totalPlanQuota);

    this.quotaSelected = quota || this.quotas[0];

    const commission = ConvertStringAmountToNumber( this.quotas[1].commissionAmount );

    const aux = [...this.quotas];

    aux.shift();

    const result = aux.find(quota => ConvertStringAmountToNumber ( quota.commissionAmount ) !== commission);

    this.feedPercentage = this.quotaSelected?.feePercentage === 0 ? this.quotaSelected?.feePercentage : this.convertAmountValue(this.quotaSelected?.feePercentage);

    if ( !result ) {
      this.comissionUnique = true;
      this.percentageCommission = '';
    } else {
      this.percentageCommission = this.convertAmountValue(this.quotaSelected?.commissionPercentage);
    }

    this.iva = commission * 0.13;
  }

  openConfirmationModal() {
    if (this.quotaSelected) {
      this.modalService.confirmationPopup(this.question || '¿Desea ampliar el plazo de este consumo?')
        .subscribe(confirmation => {
          if (confirmation) {
            this.saveQuota();
          }
        });
    }
  }

  saveQuota() {
    this.extendTermService.saveNewQuota(
      this.allowedMovementSelected.cardId,
      ConvertStringAmountToNumber(this.quotaSelected.commissionAmount),
      this.quotaSelected.quotaTo,
      this.allowedMovementSelected.movementId)
      .pipe(finalize(() => this.router.navigate(
        [`/home/extend-term/establishment/${this.allowedMovementSelected.establishmentName.trim()}/success`])))
      .subscribe(response => {
        this.extendTermService.result = {
          status: response.type,
          message: response.message
        };

        this.extendTermService.newQuota = {
          establishment: this.allowedMovementSelected.establishmentName.trim(),
          currency: this.allowedMovementSelected.originCurrency.currency,
          amount: this.quotaSelected.amountPerQuota,
          quota: this.quotaSelected.quotaTo
        };
      });
  }

  getTags(tags: Tag[]) {

    this.comisionTag = tags.find(tag => tag.description === 'ampliar.tag.comision')?.value;
    this.subtitle = tags.find(tag => tag.description === 'ampliar.subtitle')?.value;
    this.question = tags.find(tag => tag.description === 'ampliar.question')?.value;
    this.titleTag = tags.find(tag => tag.description === 'ampliar.title')?.value;
    this.disclaTag = tags.find(tag => tag.description === 'ampliar.disclaimer')?.value;
    this.monthTag = tags.find(tag => tag.description === 'ampliar.tag.meses')?.value;
    this.warningTag = tags.find(tag => tag.description === 'ampliar.message.warning')?.value;
    this.dateTag = tags.find(tag => tag.description === 'ampliar.result.fecha')?.value;
    this.quotaTag = tags.find(tag => tag.description === 'ampliar.tag.cuota')?.value;
    this.deseoTag = tags.find(tag => tag.description === 'ampliar.tag.deseo')?.value;
    this.newQuota = tags.find(tag => tag.description === 'ampliar.tag.nuevacuota')?.value;
    this.resultNew = tags.find(tag => tag.description === 'ampliar.result.nuevoplazo')?.value;
  }

  ngOnDestroy(): void {
    this.extendTermService.unsubscribe();
  }


  openModalPromo() {
    this.modalService.open({}, {width: 343, height: 390, disableClose: false, panelClass: 'promo-popup'});
  }

}
