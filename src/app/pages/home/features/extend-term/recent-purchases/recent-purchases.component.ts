import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from '../../../../../core/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {filter, finalize, map} from 'rxjs/operators';
import {ExtendTermQuota} from '../../../../../shared/models/extend-term-quota';
import {AllowedMovement} from '../../../../../shared/models/allowed-movement';
import {ExtendTermService} from '../extend-term.service';
import { CredixSliderComponent } from 'src/app/shared/components/credix-slider/credix-slider.component';
import { ConvertNumberToStringAmount } from 'src/app/shared/utils/convert-number-to-string-amount';
import {PopupPromoComponent} from '../popup-promo/popup-promo.component';
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-recent-purchases',
  templateUrl: './recent-purchases.component.html',
  styleUrls: ['./recent-purchases.component.scss']
})
export class RecentPurchasesComponent implements OnInit {

  selection: string[] = [];
  displayedColumns: string[] = ['select', 'date', 'commerce',  'quotas', 'amount'];
  allowedMovementSelected: AllowedMovement[] = [];
  allowedMovements: AllowedMovement[] = [];
  movementIdParam: string;
  quotaSelected: ExtendTermQuota;
  message = 'El plazo de su compra ha sido extendido correctamente.';
  status: 'success' | 'error';
  done = false;
  empty = false;
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
  amountArray: {amount: number, movementId: string}[] = [];
  amountSummary = '0';

  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;
  template: TemplateRef<any>;
  @ViewChild(CredixSliderComponent) credixSlider: CredixSliderComponent;

  constructor(private extendTermService: ExtendTermService,
              private tagsService: TagsService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              ) {
  }

  ngOnInit(): void {
    this.checkCutDate();
    this.getAllowedMovements();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
    this.allowedMovementState();
  }

  checkMovementParam(mov: any){
    if(mov){
      this.movementIdParam = mov;
      this.allowedMovementSelected.push(this.allowedMovements
        .find(allowedMovement => allowedMovement.movementId === this.movementIdParam));
      this.next()
    }
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


  allowedMovementState() {
    combineLatest([this.extendTermService.$allowedMovement, this.extendTermService.$promoFilter])
    .pipe(
      map(([allowedMovementState, filterPromoState]) => {
        const allowedMovementAux: AllowedMovement[] = allowedMovementState.map((values, index) => {
          return {
            originAmount: values.originAmount,
            originCurrency: values.originCurrency,
            establishmentName: values.establishmentName,
            amount: values.amount,
            cardId: values.cardId,
            totalPlanQuota: values.totalPlanQuota,
            accountNumber: values.accountNumber,
            movementId: values.movementId,
            originDate: values.originDate,
            promoApply: (values.promoApply) ? values.promoApply : false,
            promoMessage: (values.promoMessage) ? values.promoMessage : '',
            promoDiscountMessage: (values.promoDiscountMessage) ? values.promoDiscountMessage : ''
          };
        });
        const promoFilterAuxArr = allowedMovementAux.filter(( obj) => (obj.promoApply));
        if (promoFilterAuxArr.length === allowedMovementAux.length) {
          this.extendTermService.setDisabledCheckBox(true);
        }

        if (filterPromoState) {
          console.log('filtrando');
          return allowedMovementAux.filter(obj => (obj.promoApply));
        } else {
          console.log('sin filtrar');
          return allowedMovementAux;
        }
      })
    ).subscribe((res) => {
      next: this.allowedMovements = res
    });
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


  getAllowedMovements() {
    this.extendTermService.getAllowedMovements( 1004 )
      .pipe(finalize(() => this.checkMovementParam(this.route.snapshot.params?.movementId)))
      .subscribe(response => {
        console.log(response);
        if ( response?.result ) {
          this.extendTermService.setAllowedMovements(response.result)
          if (response.promo) {
            this.openModalPromo(response.promoDescription, response.promoMessage)
          }
          this.empty = false;
        } else {
          this.empty = true;
        }
      });
  }



  calculateTotalAmountSelect(amount: string, movementId: string, checked: boolean) {
    let totalAmount = 0;
    if (checked) {
      const amountToNumber = ConvertStringAmountToNumber(amount);
      if (this.amountArray.findIndex((obj) => obj.movementId === movementId) === -1) {
        this.amountArray.push({
          amount: amountToNumber,
          movementId
        });
      }
    } else {
      this.amountArray.splice(this.amountArray.findIndex((obj) => obj.movementId === movementId), 1);
    }
    totalAmount = this.amountArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    this.amountSummary = ConvertNumberToStringAmount(totalAmount);
  }


  change(checked: boolean, movement: AllowedMovement) {
    if(checked){
      this.selection.push(movement.movementId)
      this.allowedMovementSelected.push(movement);
    }else{
      this.selection.splice(this.selection.findIndex(mov => mov === movement.movementId), 1);
      this.allowedMovementSelected.splice(this.allowedMovementSelected.findIndex(mov => mov.movementId == movement.movementId),1)
    }
    this.calculateTotalAmountSelect(movement.amount, movement.movementId, checked);
  }

  

  next() {
    this.extendTermService.recentMovementsSelected = [...this.allowedMovementSelected];
    this.router.navigate(['/home/extend-term/recent-extend']);
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


  openModalPromo(promoDescription: string, promoMessage: string) {
    console.log(screen.height);
    this.modalService
      .open(
        { data: {
            promoDescription,
            promoMessage
          }, hideCloseButton: true, component: PopupPromoComponent},
        {width: 343, height: 390, disableClose: false, panelClass: 'promo-popup'}, 1);
  }
}
