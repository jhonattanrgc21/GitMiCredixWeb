import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToAwards(){
    this.router.navigate(['awards']).then();
  }


}
