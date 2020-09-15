import {Component, OnInit} from '@angular/core';
import {IncreaseLimitService} from './increase-limit.service';
import {Router} from '@angular/router';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-increase-limit',
  templateUrl: './increase-limit.component.html',
  styleUrls: ['./increase-limit.component.scss']
})
export class IncreaseLimitComponent implements OnInit {
  show = false;
  status: 'success' | 'error' | 'warning';
  message: string;
  title: string;
  titleTag: string;

  constructor(private increaseLimitService: IncreaseLimitService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cambiar PIN').tags));

    this.increaseLimitService.increaseLimit().subscribe(response => {
        this.show = true;
        this.message = response.descriptionOne;
        this.title = response.titleOne;
        switch (response.type) {
          case 'success':
            this.status = 'success';
            break;
          case 'warn':
            this.status = 'warning';
            break;
          case 'error':
            this.status = 'error';
            break;
          default:
            this.status = 'error';
        }
      }
    );
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'cambiarpin.title').value;
  }

}
