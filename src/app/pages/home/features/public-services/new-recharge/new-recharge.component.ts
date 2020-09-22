import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-recharge',
  templateUrl: './new-recharge.component.html',
  styleUrls: ['./new-recharge.component.scss']
})
export class NewRechargeComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params.id);
    });
  }

}
