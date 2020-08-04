import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-awards',
  templateUrl: './modal-awards.component.html',
  styleUrls: ['./modal-awards.component.scss'],
})
export class ModalAwardsComponent implements OnInit {
  options = { autoHide: false };
  config: any;
  userChallenges = {
    descriptionOne: '',
    descriptionTwo: '',
    json: [],
    status: '',
    titleOne: '',
    titleTwo: '',
    type: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.config = {
      id: 'custom',
      itemsPerPage: 1,
      currentPage: this.data.data.id + 1,
      totalItems: this.data.data.array.length,
    };
  }

  onPageChanged(event) {
    this.config.currentPage = event;
  }
}
