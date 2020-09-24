import {Component, OnInit} from '@angular/core';
import {MovementsService} from './movements.service';
import {Movement} from '../../../../../shared/models/movement';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas', 'extend'];
  movementDataSource: Movement[] = [];
  p = 0;
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;

  constructor(private movementsService: MovementsService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.movementsService.dataSourceObs.subscribe(movements => this.movementDataSource = movements);
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Movimientos').tags));
  }

  goToExtendTerm(movementId: number) {
    this.router.navigate(['/home/extend-term', movementId]);
  }

  getTags(tags: Tag[]) {
    this.linkTag = tags.find(tag => tag.description === 'movimientos.link').value;
    this.columnOneTag = tags.find(tag => tag.description === 'movimientos.table.column1').value;
    this.columnTwoTag = tags.find(tag => tag.description === 'movimientos.table.column2').value;
    this.columnThreeTag = tags.find(tag => tag.description === 'movimientos.table.column3').value;
    this.columnFourTag = tags.find(tag => tag.description === 'movimientos.table.column4').value;
  }
}
