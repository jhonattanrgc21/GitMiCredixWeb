import {Component, OnInit} from '@angular/core';
import {IncreaseLimitService} from './increase-limit.service';
import {Router} from '@angular/router';

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

  constructor(private increaseLimitService: IncreaseLimitService,
              private router: Router) {
  }

  ngOnInit(): void {
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
}
