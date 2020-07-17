import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../core/services/security.service";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {

  }

}
