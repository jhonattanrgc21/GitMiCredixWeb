import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MovementsService} from './movements.service';
import {Movement} from '../../../../../shared/models/movement';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {NavigationService} from '../../../../../core/services/navigation.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {ExtendTermService} from '../../extend-term/extend-term.service';
import {Router} from '@angular/router';
import {
  CredixResultNotificationComponent
} from '../../../../../shared/components/credix-result-notification/credix-result-notification.component';
@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas', 'extend'];
  movementDataSource: Movement[] = [];
  p = 0;
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;
  private operationId = 1;
  message = '';
  title = '';
  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

  constructor(private router: Router,
              private movementsService: MovementsService,
              private navigationService: NavigationService,
              private tagsService: TagsService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.movementsService.dataSourceObs.subscribe(movements => this.movementDataSource = movements);
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Movimientos').tags));
  }

  onSubmenuChanged(movementId: number) {
    this.movementsService.checkCutDate().subscribe(({ json }) => {
      const productInfo = json.deactivationList.find(
        (deactivation) => deactivation.PSD_Id === this.operationId
      );
      if (productInfo.status) {
        this.router.navigate(['/home/extend-term/recent', movementId]);
        this.navigationService.submenuChanged('extend-term');
      } else {
        this.title = productInfo.titleOne;
        this.message = productInfo.descriptionOne;
        this.modalService.open({
          template: this.modalTemplate,
        }, { width: 380, disableClose: false, panelClass: 'credix-popup-panel'});
      }
    });
  }

  getTags(tags: Tag[]) {
    this.linkTag = tags.find(tag => tag.description === 'movimientos.link')?.value;
    this.columnOneTag = tags.find(tag => tag.description === 'movimientos.table.column1')?.value;
    this.columnTwoTag = tags.find(tag => tag.description === 'movimientos.table.column2')?.value;
    this.columnThreeTag = tags.find(tag => tag.description === 'movimientos.table.column3')?.value;
    this.columnFourTag = tags.find(tag => tag.description === 'movimientos.table.column4')?.value;
  }

  ngOnDestroy(): void {
    this.movementsService.unsubscribe();
  }
}
