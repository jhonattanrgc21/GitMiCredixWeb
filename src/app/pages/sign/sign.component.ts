import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../core/services/storage.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private storageService: StorageService) {
    this.storageService.clearCurrentToken();
    this.storageService.clearCurrentUser();
    this.storageService.clearCurrentCard();
    this.storageService.clearIdentification();
  }

  ngOnInit(): void {
  }
}
