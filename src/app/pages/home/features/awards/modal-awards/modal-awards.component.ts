import {Component, Inject, OnInit} from '@angular/core';
import {StorageService} from '../../../../../core/services/storage.service';
import {HttpService} from '../../../../../core/services/http.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-awards',
  templateUrl: './modal-awards.component.html',
  styleUrls: ['./modal-awards.component.scss'],
})
export class ModalAwardsComponent implements OnInit {

  config: any;
  collection = {data: []};
  userChallenges = {
    descriptionOne: '',
    descriptionTwo: '',
    json: [],
    status: '',
    titleOne: '',
    titleTwo: '',
    type: '',
  };
  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(
    private storageService: StorageService,
    private httpServide: HttpService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    console.log(this.data.data);
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
