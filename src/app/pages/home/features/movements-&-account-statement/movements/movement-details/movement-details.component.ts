import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MovementsService} from '../movements.service';
import {MovementDetail} from '../../../../../../shared/models/movement-detail';

@Component({
  selector: 'app-movement-details',
  templateUrl: './movement-details.component.html',
  styleUrls: ['./movement-details.component.scss']
})
export class MovementDetailsComponent implements OnInit {
  movementDetail: MovementDetail;
  hideSubDetail = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public modal: MatDialogRef<MovementDetailsComponent>,
    private movementsService: MovementsService,
    ) {
    const arrayDateAux = this.data.data.originDate.split('/');
    const user = JSON.parse(localStorage.getItem('user'));
    this.movementsService.getMovementDetails(
      +arrayDateAux.reverse().join(''),
      user.actId,
      this.data.data.originAmount,
      this.data.data.quota)
      .subscribe(response => {
        console.log(response);
        this.movementDetail = response;
      });
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.modal.close();
  }

  showSubDetail(show: boolean) {
    this.hideSubDetail = show;
    if (!this.hideSubDetail) {
      this.modal.updateSize('380px', '706px');
    } else {
      this.modal.updateSize('380px', '533px');
    }
  }
}
