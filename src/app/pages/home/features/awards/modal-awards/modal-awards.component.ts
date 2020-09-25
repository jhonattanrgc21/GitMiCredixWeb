import {AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Challenge} from '../../../../../shared/models/challenge';

@Component({
  selector: 'app-modal-awards',
  templateUrl: './modal-awards.component.html',
  styleUrls: ['./modal-awards.component.scss'],
})
export class ModalAwardsComponent implements OnInit, AfterViewInit {
  currentChallenge: number;
  challenge: Challenge;
  challenges: Challenge[];
  @ViewChild('footer') footer: TemplateRef<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ModalAwardsComponent>) {
    this.challenge = this.data.data.challenge;
    this.challenges = this.data.data.challenges;
    this.currentChallenge = this.challenges.findIndex(c => c.id === this.challenge.id);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.data.footer = this.footer;
  }

  back() {
    this.currentChallenge = this.currentChallenge - 1;
    this.challenge = this.challenges[this.currentChallenge];
  }

  next() {
    this.currentChallenge = this.currentChallenge + 1;
    this.challenge = this.challenges[this.currentChallenge];
  }

}
