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
  // allowedMovements: AllowedMovement[] = [{
  //   originAmount: '2000',
  //   originCurrency: '',
  //   establishmentName: 'Casa popular',
  //   cardId: 12345,
  //   totalPlanQuota: 1,
  //   accountNumber: 12345,
  //   movementId: '1',
  //   originDate: new Date().toString(),
  // }];
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
  hideButtonPromoFilter: boolean;
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
    this.getHidePromoFilter();
  }

  ngOnDestroy(): void {
    this.extendTermService.unsubscribe();
  }

  filterRecentPromo({source, checked}) {
   this.extendTermService.setFilterPromo(checked);
  }


  tabSelected(tab) {
    if ( tab.id === 1 ) {
      this.activeTabIndex = 1;
      this.router.navigate(['home/extend-term/recent'])
    } else {
      this.activeTabIndex = 2;
      this.router.navigate(['home/extend-term/previous']);
    }
  }

  getHidePromoFilter() {
    this.extendTermService.$hidePromoFilter
      .subscribe(response => {
        console.log(response);
        this.hideButtonPromoFilter = response;
      });
  }
}
