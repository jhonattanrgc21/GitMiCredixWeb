import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import {ModalAwardsComponent} from './modal-awards/modal-awards.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  tabs = [
    { id: 1, name: 'En progreso' },
    { id: 2, name: 'Finalizados' },
  ];
  tab_show = 1;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  tabSelected(tab) {
    console.log(tab);
    if (tab.id == 1) {
      this.tab_show = 1
    } else {
      this.tab_show = 0
    }
  }

  open(){
    this.modalService.open({ component: ModalAwardsComponent, title: 'Premios' },
      { width: 376, height: 584, disableClose: true });
  }

}
