import {Component, OnInit} from '@angular/core';
import {IncreaseLimitService} from './increase-limit.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-increase-limit',
  templateUrl: './increase-limit.component.html',
  styleUrls: ['./increase-limit.component.scss']
})
export class IncreaseLimitComponent implements OnInit {
  show = false;
  status: 'success' | 'error' | 'warn';
  message: string;
  title: string;
  titleTag: string;

  constructor(private increaseLimitService: IncreaseLimitService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Aumentar límite de crédito').tags));
    this.increaseLimit();
  }

  increaseLimit() {
    this.increaseLimitService.increaseLimit().subscribe(response => {
        this.show = true;
        this.message = response.descriptionOne;
        this.title = response.titleOne;
        this.status = response.type;
      }
    );
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'aumento.title')?.value;
  }

}
