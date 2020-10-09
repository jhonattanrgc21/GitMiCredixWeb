import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-completed',
  templateUrl: './popup-completed.component.html',
  styleUrls: ['./popup-completed.component.scss']
})
export class PopupCompletedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

}
