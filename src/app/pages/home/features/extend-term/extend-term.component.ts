import {Component, OnInit} from '@angular/core';
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
export class ExtendTermComponent implements OnInit {
  tableHeaders = [
    {label: 'Consumos', width: '282px'},
    {label: 'Ampliación', width: 'auto'}
  ];
  allowedMovementSelected: AllowedMovement;
  allowedMovements: AllowedMovement[] = [];
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
  comercioResult: string;
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

  constructor(private storageService: StorageService,
              private extendTermService: ExtendTermService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private tagsService: TagsService) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.movementIdParam = this.route.snapshot.params?.movementId;
    this.getAllowedMovements();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
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
    this.extendTermService.getAllowedMovements()
      .pipe(finalize(() => this.checkMovementParam()))
      .subscribe(allowedMovements => {
        if (allowedMovements.length) {
          this.empty = false;
          this.allowedMovements = allowedMovements;
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
      this.modalService.confirmationPopup(this.question || '¿Desea ampliar el plazo de este pago?').subscribe(confirmation => {
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
      this.allowedMovementSelected.movementId
    ).pipe(finalize(() => this.done = true))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.message;
      });
  }

  getTags(tags: Tag[]) {
    this.comisionTag = tags.find(tag => tag.description === 'ampliar.tag.comision')?.value;
    this.comercioResult = tags.find(tag => tag.description === 'ampliar.result.comercio')?.value;
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

}
