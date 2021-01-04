import {Component, Input, OnInit} from '@angular/core';
import {Awards} from '../landing.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  @Input() awards: Awards[] = [{img: '', title: '', description: ''}];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToAwards() {
    this.router.navigate(['/home/awards']).then();
  }


}
