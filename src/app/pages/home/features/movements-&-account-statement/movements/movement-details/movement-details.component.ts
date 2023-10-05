import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MovementsService} from '../movements.service';
import {MovementDetail} from "../../../../../../shared/models/movement-detail";

@Component({
  selector: 'app-movement-details',
  templateUrl: './movement-details.component.html',
  styleUrls: ['./movement-details.component.scss']
})
export class MovementDetailsComponent implements OnInit {
  movementDetail: MovementDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public modal: MatDialogRef<MovementDetailsComponent>,
    private movementsService: MovementsService) {
    const arrayDateAux = this.data.data.originDate.split('/');
    const user = JSON.parse(localStorage.getItem('user'));
    this.movementsService.getMovementDetails(+arrayDateAux.reverse().join(''), user.actId, this.data.data.originAmount, 0)
      .subscribe(response => this.movementDetail = response);
  }

  ngOnInit(): void {
  }

}
