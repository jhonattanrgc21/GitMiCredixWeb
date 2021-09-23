import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from '../../../../core/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../core/services/storage.service';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {ExtendTermQuota} from '../../../../shared/models/extend-term-quota';
import {AllowedMovement} from '../../../../shared/models/allowed-movement';
import {ExtendTermService} from './extend-term.service';

@Component({
  selector: 'app-extend-term',
  templateUrl: './extend-term.component.html',
  styleUrls: ['./extend-term.component.scss'],
})
export class ExtendTermComponent implements OnInit, OnDestroy {
  tableHeaders = [
    {label: 'Consumos', width: '282px'},
    {label: 'Ampliación', width: 'auto'}
  ];
  allowedMovementSelected: AllowedMovement;
  allowedMovements: AllowedMovement[] = [{
    originAmount: '2000',
    originCurrency: '',
    establishmentName: 'Casa popular',
    cardId: 12345,
    totalPlanQuota: 1,
    accountNumber: 12345,
    movementId: '1',
    originDate: new Date().toString(),
  }];
  tabs = [
    {id: 1, name: 'Compras recientes'},
    {id: 2, name: 'Compras anteriores'},
  ];
  activeTabIndex = 1;
  tabIsChanged: boolean;
  quotaAmountFromSelected: number;
  movementIdParam: string;
  quotas: ExtendTermQuota[];
  quotaSelected: ExtendTermQuota;
  message = 'El plazo de su compra ha sido extendido correctamente.';
  status: 'success' | 'error';
  done = false;
  empty = true;
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
  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;
  template: TemplateRef<any>;

  constructor(private extendTermService: ExtendTermService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) {
    this.today = new Date();
  }

  ngOnInit(): void {
    console.log("allowedMovements: ", this.allowedMovements);

    this.tableHeaders = [
      {label: 'Fecha', width: '282px'},
      {label: 'Comercio', width: '282px'},
      {label: 'Saldo pendiente', width: '282px'},
      {label: 'Cuotas pendientes', width: 'auto'},
    ];

    this.checkCutDate();
    this.movementIdParam = this.route.snapshot.params?.movementId;
    this.getAllowedMovements();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
  }

  checkCutDate() {
    // this.extendTermService.checkCutDate().subscribe(response => {
    //   if (!response.status) {
    //     this.message = response.descriptionOne;
    //     this.title = response.titleOne;
    //     this.done = true;
    //     this.template = this.disabledTemplate;
    //   }
    // });
  }

  getAllowedMovementDetail(movement: AllowedMovement) {
    this.allowedMovementSelected = movement;
    this.quotaAmountFromSelected = ConvertStringAmountToNumber(movement.originAmount) / movement.totalPlanQuota;
    this.calculateQuota(movement.movementId);
  }

  getQuota(sliderValue) {
    this.quotaSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.quotaSelected = this.quotas[sliderValue - 1];
  }

  getAllowedMovements() {
    /*this.extendTermService.getAllowedMovements()
      .pipe(finalize(() => this.checkMovementParam()))
      .subscribe(allowedMovements => {
        if (allowedMovements.length) {
          this.empty = false;
          this.allowedMovements = allowedMovements;
        } else {
          this.empty = true;
        }
      });*/
  }

  checkMovementParam() {
    if (this.movementIdParam) {
      this.getAllowedMovementDetail(this.allowedMovements
        .find(allowedMovement => allowedMovement.movementId === this.movementIdParam));
    }
  }

  calculateQuota(movementId: string) {
    this.extendTermService.calculateQuotaByMovement(movementId)
      .pipe(finalize(() => this.initSlider()))
      .subscribe(extendTermQuotas => this.quotas = extendTermQuotas);
  }

  initSlider() {
    this.quotaSliderDisplayMin = this.quotas[0].quotaTo;
    this.quotaSliderMin = 1;
    this.quotaSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
    this.quotaSliderMax = this.quotas.length;
    this.quotaSliderDisplayValue = this.quotaSliderDisplayMin;
    const quota = this.quotas.find(q => q.quotaTo === this.allowedMovementSelected.totalPlanQuota);
    this.quotaSelected = quota || this.quotas[0];
  }

  openConfirmationModal() {
    if (this.quotaSelected) {
      this.modalService.confirmationPopup(this.question || '¿Desea ampliar el plazo de este pago?')
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
      ConvertStringAmountToNumber(this.quotaSelected.feeAmount),
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

  tabSelected(tab) {
    /*this.tabId = tab.id;
    this.empty = false;
    this.accounts = [];
    switch (tab.id) {
      case 1:
        this.router.navigate(['home/favorites-management/iban-accounts']);
        this.tableHeaders[0].label = 'Cuentas guardadas';
        this.tableHeaders[1].label = 'Detalle de la cuenta';
        this.getFavoritesIban();
        this.favoriteManagementService.emitIsTabChange();
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        this.tableHeaders[0].label = 'Pagos guardados';
        this.tableHeaders[1].label = 'Detalle del pago';
        this.getPublicService();
        this.favoriteManagementService.emitIsTabChange();
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        this.tableHeaders[0].label = 'Cuentas guardadas';
        this.tableHeaders[1].label = 'Detalle de la cuenta';
        this.getSchedulePayment();
        this.favoriteManagementService.emitIsTabChange();
        break;
    }*/
  }
}
