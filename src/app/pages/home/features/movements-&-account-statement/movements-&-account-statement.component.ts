import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-movements-state-account',
  templateUrl: './movements-&-account-statement.component.html',
  styleUrls: ['./movements-&-account-statement.component.scss']
})
export class MovementsAccountStatementComponent implements OnInit {
  tabs = [
    {id: 1, name: 'Recientes'},
    {id: 2, name: 'Estados de cuenta'}
  ];
  selectTab = 1;
  titleTag: string;

  constructor(private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Movimientos').tags));
  }

  tabSelected(tab) {
    this.selectTab = tab.id;
    this.router.navigate([`/home/movements-&-account-statement/${tab.id === 1 ? 'movements' : 'account-statement'}`]);
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'movimientos.title')?.value;
    this.tabs = [
      {id: 1, name: tags.find(tag => tag.description === 'movimientos.tab1')?.value || 'Pagos digitales'},
      {id: 2, name: tags.find(tag => tag.description === 'movimientos.tab2')?.value || 'Comercios'},
    ];
  }
}
