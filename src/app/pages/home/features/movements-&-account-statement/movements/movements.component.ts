import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovementsService} from './movements.service';
import {Movement} from '../../../../../shared/models/movement';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {NavigationService} from '../../../../../core/services/navigation.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {MovementDetailsComponent} from './movement-details/movement-details.component';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas', 'extend', 'detail'];
  movementDataSource: Movement[] = [];
  p = 0;
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;

  constructor(private movementsService: MovementsService,
              private navigationService: NavigationService,
              private modalService: ModalService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.movementsService.dataSourceObs.subscribe(movements => this.movementDataSource = movements);
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Movimientos').tags));
  }

  onSubmenuChanged() {
    this.navigationService.submenuChanged('extend-term');
  }

  getTags(tags: Tag[]) {
    this.linkTag = tags.find(tag => tag.description === 'movimientos.link')?.value;
    this.columnOneTag = tags.find(tag => tag.description === 'movimientos.table.column1')?.value;
    this.columnTwoTag = tags.find(tag => tag.description === 'movimientos.table.column2')?.value;
    this.columnThreeTag = tags.find(tag => tag.description === 'movimientos.table.column3')?.value;
    this.columnFourTag = tags.find(tag => tag.description === 'movimientos.table.column4')?.value;
  }

  openModalDetail(element) {
    this.modalService.open({
      component: MovementDetailsComponent,
      data: element,
      hideCloseButton: false
    }, {panelClass: 'movement-details-panel', disableClose: false, width: 380, height: 533}).afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.movementsService.unsubscribe();
  }
}
